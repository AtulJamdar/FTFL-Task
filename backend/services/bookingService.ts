import { Slot } from '../models/Slot';
import { Booking, IBooking } from '../models/Booking';
import { Types } from 'mongoose';
import { BookingError } from '../types/booking';

export class BookingService {
  static async bookSlot(slotId: string, userId: string): Promise<IBooking> {
    if (!Types.ObjectId.isValid(slotId)) {
      throw { status: 400, message: 'Invalid slot ID format' } as BookingError;
    }

    let updatedSlot;
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
      const bookingError = error as BookingError & { name?: string };
      if (bookingError?.name === 'CastError') {
        throw { status: 400, message: 'Invalid slot ID format' } as BookingError;
      }
      throw { status: 500, message: 'Booking processing failed' } as BookingError;
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
      return booking;
    } catch (_error: unknown) {
      await Slot.findOneAndUpdate(
        { _id: slotId, bookedCount: { $gt: 0 } },
        { $inc: { bookedCount: -1 } },
        { returnDocument: 'after' }
      );
      throw { status: 500, message: 'Booking processing failed' } as BookingError;
    }
  }
}