"use client";

import { useEffect, useRef, useState } from "react";
import API from "@/src/services/api";

type Slot = {
  _id: string;
  title: string;
  capacity: number;
  bookedCount: number;
  remainingCapacity: number;
};

export default function Home() {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [bookingLoadingId, setBookingLoadingId] = useState<string | null>(null);
  const bookingLockRef = useRef<Set<string>>(new Set());

  const fetchSlots = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await API.get<Slot[]>("/slots");
      setSlots(response.data);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to load slots";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, []);

  const handleBook = async (slotId: string) => {
    if (bookingLockRef.current.has(slotId)) {
      return;
    }

    bookingLockRef.current.add(slotId);
    setBookingLoadingId(slotId);
    setError(null);
    setBookingId(null);

    try {
      await API.post(`/slots/${slotId}/book`, { userId: "demo-user" });
      setBookingId(slotId);
      await fetchSlots();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Booking failed";
      setError(message);
    } finally {
      bookingLockRef.current.delete(slotId);
      setBookingLoadingId(null);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-10 text-zinc-900">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">
              Slot Booking
            </p>
            <h1 className="text-3xl font-semibold">Available Slots</h1>
          </div>
        </div>

        {loading && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-zinc-600">
            Loading slots...
          </div>
        )}

        {error && !loading && (
          <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {!loading && !error && slots.length === 0 && (
          <div className="rounded-lg border border-zinc-200 bg-white p-6 text-center text-zinc-600">
            No slots available right now.
          </div>
        )}

        <div className="grid gap-4 md:grid-cols-2">
          {slots.map((slot) => {
            const isBooked = slot.remainingCapacity <= 0;
            const isBooking = bookingLoadingId === slot._id;
            const isSuccess = bookingId === slot._id;

            return (
              <div key={slot._id} className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{slot.title}</h2>
                    <p className="mt-1 text-sm text-zinc-600">
                      Remaining: {slot.remainingCapacity}
                    </p>
                  </div>
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700">
                    {slot.bookedCount}/{slot.capacity}
                  </span>
                </div>

                <button
                  onClick={() => handleBook(slot._id)}
                  disabled={isBooked || isBooking}
                  className="mt-5 w-full rounded-lg bg-zinc-900 px-4 py-2 font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:bg-zinc-300"
                >
                  {isBooking ? "Booking..." : isBooked ? "Fully Booked" : "Book Slot"}
                </button>

                {isSuccess && (
                  <p className="mt-3 text-sm font-medium text-green-600">
                    Slot booked successfully.
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
