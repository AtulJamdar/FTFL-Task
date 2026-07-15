import { Router } from 'express';
import { bookSlotController, getBookingsController, getSlotsController } from '../controllers/bookingController';

const router = Router();

// Phase 3 Endpoint
router.get('/slots', getSlotsController);

// Phase 4 Endpoint
router.post('/slots/:id/book', bookSlotController);

// Phase 6 Endpoint
router.get('/bookings', getBookingsController);

export default router;
sdfs