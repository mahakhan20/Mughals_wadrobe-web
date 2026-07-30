# Day 7 – Local MongoDB Connection & Weekly Report
**Date:** July 26, 2026
**Module:** 1 (July 20 – July 26, 2026)

## Objective
Connect the Express server to a local MongoDB database and wrap up Module 1
with a weekly progress report.

## Work Completed

### 1. Local MongoDB Connection (config/db.js)
- Wrote a `connectDB()` function using Mongoose to connect to a **local**
  MongoDB instance (`mongodb://127.0.0.1:27017/shopsphere`) — no MongoDB
  Atlas, no cloud database.
- Added clear console logging on successful connection, and proper error
  handling (`process.exit(1)`) if MongoDB isn't running locally.
- Called `connectDB()` from `server.js` on startup.

### 2. Verification
- Confirmed the server correctly logs a connection message when a local
  `mongod` instance is running.
- Confirmed the server exits gracefully with a clear error message if
  MongoDB is not running — instead of crashing silently.

### 3. Weekly Progress Report
- Confirmed the GitHub repository is up to date with all Module 1 work:
  full responsive frontend (7 pages) + backend server skeleton + local DB
  connection.
- Updated `README.md` and `docs/` with progress logs for Day 1–7.

## Decisions Made
- No production/live deployment — the entire project (frontend, backend,
  database) is designed to run locally.

## Module 1 Status: ✅ Complete

## Next Steps (Module 2 – July 27 – Aug 02, 2026)
- Design MongoDB schemas (Product, User) using Mongoose.
- Build REST APIs for products (GET all, GET single, admin CRUD).
- Connect Shop and Single Product pages to live backend data.
