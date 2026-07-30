# Day 6 – Backend Server Skeleton
**Date:** July 25, 2026
**Module:** 1 (July 20 – July 26, 2026)

## Objective
Initialize the Node.js + Express backend so it's ready to connect to MongoDB
and start serving API routes in Module 2.

## Work Completed

### 1. Project Initialization
- Ran `npm init` inside `server/` to create `package.json`.
- Installed core dependencies: `express`, `mongoose`, `cors`, `dotenv`.
- Installed `nodemon` as a dev dependency for auto-restart during development.

### 2. Server Entry Point (server.js)
- Created `server.js` with a basic Express app.
- Added `express.json()` and `cors()` middleware so the app can parse JSON
  bodies and allow requests from the frontend (`client/`).
- Added a health-check route (`GET /`) that returns a simple confirmation
  message when the server is running.
- Confirmed the server boots locally on a configurable port (default 5000).

### 3. Environment Variables
- Created `.env.example` listing the variables the project needs: `PORT`,
  `MONGO_URI`, `JWT_SECRET`.
- Added `.gitignore` to exclude `node_modules/` and `.env` from version control.

## Decisions Made
- Backend structured with dedicated `config/`, `models/`, `controllers/`,
  `routes/`, and `middleware/` folders (MVC-style) ahead of Module 2.
- Server will run on port 5000 by default; can be changed via `.env`.

## Next Steps (Day 7)
- Connect the server to a local MongoDB database.
