import { Slot } from '../models/Slot';
import { Booking, IBooking } from '../models/Booking';
import { Types } from 'mongoose';

export class BookingService {
  static async bookSlot(slotId: string, userId: string): Promise<IBooking> {
    // Validation: Ensure ObjectId format is correct before hitting DB
    if (!Types.ObjectId.isValid(slotId)) {
      throw { status: 400, message: 'Invalid slot ID format' };
    }

    // ATOMIC OPERATION: Filter and increment in ONE single database step
    const updatedSlot = await Slot.findOneAndUpdate(
      {
        _id: slotId,
        $expr: { $lt: ['$bookedCount', '$capacity'] } // Condition: only match if count < capacity
      },
      {
        $inc: { bookedCount: 1 } // Atomic increment execution
      },
      { new: true } // Return the document after the update
    );

    // If update returns null, it means the slot is either missing OR completely full
    if (!updatedSlot) {
      const slotExists = await Slot.findById(slotId);
      if (!slotExists) {
        throw { status: 404, message: 'Slot not found' };
      }
      // Concurrency Gate: Drop the request immediately with a 409 status code
      throw { status: 409, message: 'Slot is already full' };
    }

    // Once the slot count is safely locked, create the Booking transaction document
    try {
      const booking = await Booking.create({ slotId, userId });
      return booking;
    } catch (error: any) {
      // Rollback safety mechanism: If writing the booking fails, decrement the slot back
      await Slot.findByIdAndUpdate(slotId, { $inc: { bookedCount: -1 } });
      throw { status: 500, message: 'Booking processing failed' };
    }
  }
}