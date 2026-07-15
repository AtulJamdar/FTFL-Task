import { Types } from 'mongoose';

export interface SlotSummary {
  _id: Types.ObjectId | string;
  title: string;
  capacity: number;
  bookedCount: number;
  remainingCapacity: number;
  remaining: number;
}

export interface BookingRequestBody {
  userId?: unknown;
}

export interface BookingError extends Error {
  status?: number;
  message: string;
}

export interface BookingPayload {
  _id: Types.ObjectId | string;
  slotId: Types.ObjectId | string;
  userId: string;
  createdAt: Date;
}
