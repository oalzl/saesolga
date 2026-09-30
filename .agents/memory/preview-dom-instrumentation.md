---
name: Preview DOM instrumentation
description: Why browser checks should not compare exact HTML strings in development previews
---

Development previews may add metadata attributes to rendered elements, including line breaks.

**Why:** An exact `innerHTML` assertion failed even though the visible text and DOM structure were correct.

**How to apply:** Check text nodes, element types, and behavior-relevant attributes instead of comparing full `innerHTML` strings.