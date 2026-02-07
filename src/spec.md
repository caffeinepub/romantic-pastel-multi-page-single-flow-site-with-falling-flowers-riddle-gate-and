# Specification

## Summary
**Goal:** Remove all AI-generated images and image-based decorative effects from the UI, except for the Final page’s last “This is you 🌷” upload/preview section.

**Planned changes:**
- Remove the fixed AI-generated photo from the Riddle page (currently `/assets/generated/her-photo.dim_1024x1024.png`).
- Remove the fixed AI-generated photo from the Intermediate page (currently `/assets/generated/my-photo.dim_1024x1024.png`).
- Remove AI-generated image usage from the Landing page title styling (currently referencing `/assets/generated/floral-texture-seamless.dim_1024x1024.png`).
- Remove the falling flower background animation and cursor petal trail so they no longer load or depend on `/assets/generated/rose-petal-sprite.dim_256x256.png` or `/assets/generated/tulip-petal-sprite.dim_256x256.png`.
- Keep the existing flow, copy, and interactivity unchanged (navigation steps, riddle attempts and messaging, music toggle, and back button behavior), and keep the Final page’s last section title exactly “This is you 🌷” with the existing upload + preview behavior.

**User-visible outcome:** The app looks the same in terms of text, flow, and interactions, but no longer shows AI-generated photos or decorative image effects anywhere—except the Final page’s last “This is you 🌷” section, where the user can still upload and preview their own photo.
