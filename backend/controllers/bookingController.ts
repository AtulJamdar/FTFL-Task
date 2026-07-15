import { Request, Response } from 'express';
import { Slot } from '../models/Slot';
import { Booking } from '../models/Booking';

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
    const { slotId } = req.params;
    const slot = await Slot.findById(slotId);

    if (!slot) {
      res.status(404).json({ error: 'Slot not found' });
      return;
    }

    if (slot.bookedCount >= slot.capacity) {
      res.status(400).json({ error: 'Slot is fully booked' });
      return;
    }

    slot.bookedCount += 1;
    await slot.save();

    const booking = await Booking.create({
      slotId: slot._id,
      userId: req.body?.userId || 'anonymous',
    });

    res.status(201).json({ message: 'Slot booked successfully', booking });
  } catch (error: any) {
    res.status(500).json({ error: error.message || 'Failed to book slot' });
  }
};