import { Request, Response } from 'express';
import { Slot } from '../models/Slot';
import { Booking } from '../models/Booking';
import { BookingService } from '../services/bookingService';
import { Types } from 'mongoose';
import { BookingError, BookingRequestBody, SlotSummary } from '../types/booking';
import { seedSlots } from '../services/seedService';

export const getSlotsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    const slots = await Slot.find({});

    const formattedSlots: SlotSummary[] = slots.map((slot) => {
      const capacity = slot.capacity;
      const bookedCount = slot.bookedCount;
      const remainingCapacity = Math.max(0, capacity - bookedCount);

      return {
        _id: slot._id,
        title: slot.title,
        capacity,
        bookedCount,
        remainingCapacity,
        remaining: remainingCapacity,
      };
    });

    res.status(200).json(formattedSlots);
  } catch (error: unknown) {
    const bookingError = error as BookingError;
    res.status(500).json({ error: bookingError.message || 'Failed to fetch slots' });
  }
};

export const bookSlotController = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const { userId } = req.body as BookingRequestBody;

    if (!userId || typeof userId !== 'string' || userId.trim() === '') {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    if (!Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: 'Invalid slot ID format' });
      return;
    }

    const result = await BookingService.bookSlot(id, userId);
    res.status(201).json({
      message: 'Slot booked successfully',
      booking: result.booking,
      slot: result.slot,
    });
  } catch (error: unknown) {
    const bookingError = error as BookingError;
    const statusCode = bookingError.status || 500;
    const message = bookingError.message || 'Internal Server Error';
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

    const bookings = await Booking.find({ userId }).sort({ createdAt: -1 }).populate({
      path: 'slotId',
      select: 'title capacity bookedCount',
    });
    res.status(200).json(bookings);
  } catch (error: unknown) {
    const bookingError = error as BookingError;
    res.status(500).json({ error: bookingError.message || 'Failed to fetch bookings' });
  }
};

export const seedSlotsController = async (_req: Request, res: Response): Promise<void> => {
  try {
    await seedSlots();
    const slots = await Slot.find({}).sort({ createdAt: -1 });
    res.status(200).json({ message: 'Seeded default slots', count: slots.length, slots });
  } catch (error: unknown) {
    const bookingError = error as BookingError;
    res.status(500).json({ error: bookingError.message || 'Failed to seed slots' });
  }
};