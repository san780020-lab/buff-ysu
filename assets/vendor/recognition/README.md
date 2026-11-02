# Local recognition dependencies

These dependencies are only loaded from `admin-recognizer.html` after the owner clicks Start recognition. They are not loaded by the public homepage. File bytes remain in the browser. No OCR provider endpoint or GitHub token is passed to this frame.

- Tesseract.js 6.0.1: https://github.com/naptha/tesseract.js — Apache-2.0; license retained in `tesseract/LICENSE.md`.
- Tesseract.js-core 6.0.0: https://github.com/naptha/tesseract.js-core — Apache-2.0; license retained in `core/LICENSE`.
- PDF.js 5.4.296: https://github.com/mozilla/pdf.js — Apache-2.0; license and bundled notices retained under `pdf/`.
- `@tesseract.js-data/chi_sim` and `@tesseract.js-data/eng` 1.0.0: https://github.com/naptha/tessdata — package metadata specifies MIT; the upstream Tesseract language data is Apache-2.0 (text retained in `lang/LICENSE-APACHE-2.0`), https://github.com/tesseract-ocr/tessdata_best.

`scripts/vendor-recognition.py` downloads the exact pinned npm archives, verifies their npm SHA-512 integrity and writes a per-file SHA-256 manifest. Do not replace dependencies without repeating browser OCR and PDF checks. Original minified files are retained; unavailable source maps are development-only and are not needed at runtime.
