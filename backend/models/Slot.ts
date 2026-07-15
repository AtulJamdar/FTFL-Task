import { Schema, model, Document } from 'mongoose';

export interface ISlot extends Document {
  title: string;
  capacity: number;
  bookedCount: number;
}

const SlotSchema = new Schema<ISlot>({
  title: { type: String, required: true },
  capacity: { type: Number, required: true, min: 1 },
  bookedCount: { type: Number, required: true, default: 0 },
});

export const Slot = model<ISlot>('Slot', SlotSchema);