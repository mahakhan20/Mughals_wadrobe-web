# Day 8 – Product Schema Design
**Date:** July 27, 2026
**Module:** 2 (July 27 – Aug 02, 2026)

## Objective
Design the MongoDB Product schema and connect it into the Express backend,
laying the foundation for the Product API.

## Work Completed

### 1. Product Schema (models/Product.js)
- Defined the Product schema using Mongoose with the following fields:
  - `name` (String, required)
  - `description` (String)
  - `price` (Number, required, min 0)
  - `quantity` (Number, required, min 0)
  - `image` (String — image filename/path)
  - `category` (String, default "General")
  - `createdAt` / `updatedAt` (auto-generated via `timestamps: true`)

### 2. User Schema (models/User.js)
- Defined a basic User schema (`name`, `email` (unique), `password`) ready
  for Module 3's authentication work.

### 3. Model Testing
- Verified the schema structure with sample data.
- Confirmed required-field validation and default values work as expected.

## Decisions Made
- Kept the schema simple for now (no variants/sizes) to match project scope.
- A `seed.js` script was prepared to quickly populate the local database with
  sample products matching the ones already shown in the frontend.

## Next Steps (Day 9)
- Build REST API routes for products (GET all, GET single).
