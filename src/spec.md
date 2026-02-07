# Specification

## Summary
**Goal:** Remove any “This is you” heading text from the Final page photo section while keeping the rest of the Final page unchanged.

**Planned changes:**
- Remove the “This is you 🌷” heading from the Final page photo upload section and remove any now-unneeded spacing associated with that heading.
- Update `frontend/src/content/strings.ts` to remove the user-facing “This is you 🌷” string (and any other user-facing “This is you” value) while keeping all remaining strings in English and otherwise unchanged.

**User-visible outcome:** On the Final page, users no longer see any “This is you” text anywhere; the line “this is for you” remains immediately above the photo upload component and everything else behaves the same.
