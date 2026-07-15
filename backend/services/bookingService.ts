import { Slot, ISlot } from '../models/Slot';
import { Booking, IBooking } from '../models/Booking';
import { Types } from 'mongoose';
import { BookingError } from '../types/booking';

export const mapBookingError = (error: unknown): BookingError => {
  const bookingError = error as BookingError & { name?: string; code?: number };

  if (bookingError?.name === 'CastError') {
    return { status: 400, message: 'Invalid slot ID format' } as BookingError;
  }

  if (bookingError?.code === 11000) {
    return { status: 409, message: 'You already booked this slot' } as BookingError;
  }

  return { status: 500, message: 'Booking processing failed' } as BookingError;
};

export class BookingService {
  static async bookSlot(slotId: string, userId: string): Promise<{ booking: IBooking; slot: { _id: string; title: string; capacity: number; bookedCount: number; remainingCapacity: number } }> {
    if (!Types.ObjectId.isValid(slotId)) {
      throw { status: 400, message: 'Invalid slot ID format' } as BookingError;
    }

    let updatedSlot: ISlot | null = null;
    try {
      updatedSlot = await Slot.findOneAndUpdate(
        {
          _id: slotId,
          $expr: { $lt: ['$bookedCount', '$capacity'] },
        },
        {
          $inc: { bookedCount: 1 },
        },
        { returnDocument: 'after' }
      );
    } catch (error: unknown) {
      throw mapBookingError(error);
    }

    if (!updatedSlot) {
      const slotExists = await Slot.findById(slotId);
      if (!slotExists) {
        throw { status: 404, message: 'Slot not found' } as BookingError;
      }
      throw { status: 409, message: 'Slot is already full' } as BookingError;
    }

    try {
      const booking = await Booking.create({ slotId, userId });
      const slotPayload = {
        _id: updatedSlot._id.toString(),
        title: updatedSlot.title,
        capacity: updatedSlot.capacity,
        bookedCount: updatedSlot.bookedCount,
        remainingCapacity: Math.max(0, updatedSlot.capacity - updatedSlot.bookedCount),
      };
      return { booking, slot: slotPayload };
    } catch (error: unknown) {
      await Slot.findOneAndUpdate(
        { _id: slotId, bookedCount: { $gt: 0 } },
        { $inc: { bookedCount: -1 } },
        { returnDocument: 'after' }
      );
      throw mapBookingError(error);
    }
  }
}