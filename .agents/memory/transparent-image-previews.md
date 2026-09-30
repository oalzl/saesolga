---
name: Transparent image previews
description: Distinguishing alpha transparency from opaque dark pixels in supplied artwork
---

Do not infer an opaque black background solely from an image-viewer preview of a transparent PNG. Check alpha at representative pixels and compare a browser rendering over the intended page background before adding CSS color behind the image.

**Why:** A preview painted transparent pixels black while the lower area of the artwork contained genuinely opaque dark pixels. Treating both as a flat black background caused a duplicate panel to be drawn over the artwork.

**How to apply:** When positioning content over user-supplied composited PNGs, inspect pixel opacity or composite the image over the target background first; use the artwork's existing opaque regions instead of recreating them with CSS.