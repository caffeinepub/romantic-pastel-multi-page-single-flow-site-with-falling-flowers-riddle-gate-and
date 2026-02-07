# Specification

## Summary
**Goal:** Add an always-accessible back button on all non-landing pages that returns the user to the Landing page and resets the flow state for a fresh restart.

**Planned changes:**
- Add a romantic-styled back button to Riddle, Intermediate, and Final pages that navigates directly to the Landing page without blocking existing controls (e.g., the top-right music toggle).
- Extend the flow state manager (FlowProvider) with a dedicated action to return to Landing (e.g., `goToLanding`) and reset the riddle attempts back to 2 when used.
- Ensure returning to Landing via the back button preserves existing smooth fade transitions and keeps session storage state consistent (no stuck state on refresh).

**User-visible outcome:** On Riddle, Intermediate, and Final pages, users can tap a back button to return to the Landing page at any time; when they start again, the riddle begins with 2 attempts remaining and the app transitions remain smooth.
