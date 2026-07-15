import { Router } from 'express';
import { bookSlotController } from '../controllers/bookingController';
import { getSlotsController } from '../controllers/bookingController'; // Import the new controller

const router = Router();

// Phase 3 Endpoint
router.get('/slots', getSlotsController);

// Phase 4 Endpoint
router.post('/slots/:slotId/book', bookSlotController);

export default router;