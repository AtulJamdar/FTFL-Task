import { Slot } from '../models/Slot';

const defaultSlots = [
  { title: 'Morning Session', capacity: 5, bookedCount: 0 },
  { title: 'Afternoon Session', capacity: 3, bookedCount: 0 },
  { title: 'Evening Session', capacity: 4, bookedCount: 0 },
];

export const seedSlots = async (): Promise<void> => {
  const count = await Slot.countDocuments();
  if (count > 0) {
    return;
  }

  await Slot.insertMany(defaultSlots);
  console.log('Seeded default slots');
};
