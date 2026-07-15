import { Request, Response } from 'express';
import { Slot } from '../models/Slot';
import { Booking } from '../models/Booking';
import { BookingService } from '../services/bookingService';

export const getSlotsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const slots = await Slot.find({});

    // Map the slots to only return the requested fields
    const formattedSlots = slots.map((slot) => {
      const capacity = slot.capacity;
      const bookedCount = slot.bookedCount;
      const remainingCapacity = Math.max(0, capacity - bookedCount); // Fallback to 0 to avoid negative capacity values

      return {
        _id: slot._id,
        title: slot.title,
        capacity,
        bookedCount,
        remainingCapacity,
      };
    });

    res.status(200).json(formattedSlots);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch slots' });
  }
};

export const bookSlotController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id; // Matches /slots/:id/book
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const booking = await BookingService.bookSlot(id, userId);
    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (error: any) {
    const statusCode = error.status || 500;
    res.status(statusCode).json({ error: error.message || 'Internal Server Error' });
  }
};