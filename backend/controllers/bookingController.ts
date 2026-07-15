import { Request, Response } from 'express';
import { Slot } from '../models/Slot';
import { Booking } from '../models/Booking';
import { BookingService } from '../services/bookingService';
import { Types } from 'mongoose';

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

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid slot ID format' });
      return;
    }

    const booking = await BookingService.bookSlot(id, userId);
    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (error: any) {
    const statusCode = error.status || 500;
    const message = error.message || 'Internal Server Error';
    res.status(statusCode).json({ error: message });
  }
};

export const getBookingsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.query.userId;

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to fetch bookings' });
  }
};