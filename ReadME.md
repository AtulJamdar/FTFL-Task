# Slot Booking App

A simple MERN stack slot-booking app with atomic booking protection, seeded demo data, and a minimal Next.js frontend.

## Features

- Fetches available slots from the backend
- Prevents overbooking with MongoDB atomic updates
- Stores bookings for a user and exposes booking history
- Seeds demo slots automatically when the database is empty

## How overbooking is prevented

Booking uses MongoDB's atomic `findOneAndUpdate()` with a filter that checks `bookedCount < capacity` and increments the count in the same operation. Because the condition and increment execute together, concurrent requests cannot exceed the slot capacity. If no document matches, the API returns HTTP 409.

## Tradeoff

I chose `findOneAndUpdate()` over MongoDB transactions because only one document requires synchronization. This keeps the implementation simpler and faster while still guaranteeing correctness.

## API endpoints

- GET `/api/slots`
- POST `/api/slots/:id/book`
- GET `/api/bookings?userId=<userId>`
- POST `/api/seed`

## Setup

```bash
git clone <repo-url>
cd FTFL-Task
npm install
```

### Run backend

```bash
cd backend
npm run dev
```

### Run frontend

```bash
cd frontend
npm run dev
```

### Environment variable for frontend

Create a frontend environment variable for local development:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Local URLs

- Backend API: http://localhost:5000/api
- Frontend UI: http://localhost:3000

### Seed demo data

If the database is empty, the backend seeds a few sample slots automatically on startup. You can also seed them manually by calling:

```bash
curl -X POST http://localhost:5000/api/seed
```

### Deployment notes

- Backend is deployed on Render and served at `https://ftfl-task.onrender.com/api`
- Frontend is deployed on Vercel
- In Vercel, set `NEXT_PUBLIC_API_URL=https://ftfl-task.onrender.com/api`

## Final Testing Checklist

### Backend
- ✅ GET `/api/slots`
- ✅ POST `/api/slots/:id/book`
- ✅ GET `/api/bookings?userId=demo-user`
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
- ✅ Includes deployment notes
