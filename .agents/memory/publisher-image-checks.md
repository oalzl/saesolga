---
name: Publisher image checks
description: Why HEAD requests can incorrectly label publisher-hosted article images as unavailable.
---

Some publisher image CDNs return HTTP 404 to HEAD requests while serving the same image successfully with GET. Do not classify an article thumbnail as broken based on HEAD alone.

**Why:** A thumbnail source appeared unavailable during header checks, but byte-range GET and the rendered browser image both succeeded.

**How to apply:** When using externally hosted article images, verify with a GET request or a browser image load before selecting an alternative. Confirm that the image has nonzero natural dimensions in the actual app.