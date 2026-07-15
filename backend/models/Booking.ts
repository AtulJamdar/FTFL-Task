import { Schema, model, Document, Types } from 'mongoose';

export interface IBooking extends Document {
  slotId: Types.ObjectId;
  userId: string;
  createdAt: Date;
}

const BookingSchema = new Schema<IBooking>({
  slotId: { type: Schema.Types.ObjectId, ref: 'Slot', required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Compound index to guarantee a user cannot book the same slot twice
BookingSchema.index({ slotId: 1, userId: 1 }, { unique: true });

export const Booking = model<IBooking>('Booking', BookingSchema);