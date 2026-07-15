# Slot Booking App

A simple MERN stack slot-booking app with atomic booking protection and a minimal frontend UI.

## How prevented overbooking?

Booking uses MongoDB's atomic `findOneAndUpdate()` with a filter that checks `bookedCount < capacity` and increments the count in the same operation. Because the condition and increment execute atomically, concurrent requests cannot increment beyond capacity. If no document matches, the API returns HTTP 409.

## Tradeoff

I chose `findOneAndUpdate()` over MongoDB transactions because only one document requires synchronization. This reduces complexity and improves performance while still guaranteeing correctness.

## Setup

```bash
git clone <repo-url>
cd FTFL-Task
npm install
npm run dev
```

## Run the app

- Backend API: http://localhost:5000/api
- Frontend UI: http://localhost:3000

## Final Testing Checklist

### Backend
- ✅ GET /slots
- ✅ POST /book
- ✅ GET /bookings
- ✅ 400 validation
- ✅ 409 when full
- ✅ Atomic update
- ✅ No overbooking under 20 concurrent requests

### Frontend
- ✅ Fetch slots
- ✅ Loading state
- ✅ Error state
- ✅ Disable full slots
- ✅ Disable during request
- ✅ Refresh after booking

### Code
- ✅ No `any`
- ✅ Service layer
- ✅ Typed models
- ✅ Clean folders

### README
- ✅ Explains atomic mechanism
- ✅ Mentions tradeoff
- ✅ Setup
