# Day 19 – Edge-Case & Error-Handling Pass
**Date:** August 12, 2026
**Module:** 4, Day 3 (Aug 10 – Aug 15, 2026)

## Objective
Deliberately try to break the site - empty states, bad input, invalid
logins, and the backend being offline - to confirm every failure mode
shows a clear message instead of a blank page or silent bad data.

## Work Completed
Ran a full suite of edge-case tests against the backend and frontend,
covering empty states, invalid auth, malformed input, and server-down
behavior.

## Bugs Found & Fixed
1. **Signup accepted a whitespace-only name.** No `.trim()` check existed,
   so `"   "` passed as a valid name. Fixed by rejecting untrimmed-empty
   names and trimming the name before saving.
2. **Signup never validated email format.** Unlike the Contact form,
   signup had no email pattern check at all - `"not-an-email"` would be
   accepted. Fixed by applying the same email regex used in the Contact
   controller.
3. **Cart quantity update accepted non-numeric input** (e.g. `"abc"`)
   and saved it directly to MongoDB without rejecting it - a real
   data-integrity bug, since the old check (`quantity < 1`) silently
   evaluates to `false` for non-numeric strings instead of catching them.
   Fixed by explicitly converting to a number and validating it's a
   finite whole number of at least 1.

## Confirmed Working (no changes needed)
- Empty product list, empty cart, and empty form submissions all show
  clear messages.
- Wrong password, non-existent email, duplicate email, and short
  password at signup/login all return the correct error.
- A malformed product ID in the URL returns 400 instead of crashing.
- Adding to cart with `0` or a negative quantity already defaulted
  safely to `1`.
- The frontend shows a clear "backend not running" message when the
  server is completely unreachable (tested by pointing at a dead port).

## Next Steps (Day 20)
- Code cleanup and final repository organization.