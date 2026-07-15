import { Router } from 'express';
import { bookSlotController, getBookingsController, getSlotsController, seedSlotsController } from '../controllers/bookingController';

const router = Router();

// Phase 3 Endpoint
router.get('/slots', getSlotsController);

// Phase 4 Endpoint
router.post('/slots/:id/book', bookSlotController);

// Phase 6 Endpoint
router.get('/bookings', getBookingsController);

// Seed demo data
router.post('/seed', seedSlotsController);

export default router;
