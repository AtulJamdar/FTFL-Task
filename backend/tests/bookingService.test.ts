import test from 'node:test';
import assert from 'node:assert/strict';
import { mapBookingError } from '../services/bookingService';

test('maps duplicate key errors to a clear 409 response', () => {
  const error = { code: 11000, name: 'MongoServerError' };
  const result = mapBookingError(error);

  assert.equal(result.status, 409);
  assert.equal(result.message, 'You already booked this slot');
});
