# Milestone Roadmap — ChemFetch 🎯
_Last updated: 2025-07-20_

| Phase | Scope | Status | Key Deliverables | Notes |
|-------|-------|--------|------------------|-------|
| **0 — Repo & Tooling** | GitHub repo, Poetry, Ruff, Black, Pre-commit, CI skeleton | ✅ _complete_ | Automated lint/format, pytest baseline |   |
| **1 — Backend MVP** | FastAPI app, Celery worker skeleton, PostgreSQL models, health endpoint | 🟡 _in progress_ | `GET /health` ✔, DB models draft, SDS parse pipeline stubs | `/products/{gtin}` not implemented yet |
| **1-b — Mobile Alpha (NEW)** | Expo Dev-Client (SDK 53, New Arch), barcode scan, register screen, API client | 🟢 _active_ | <br>• Dev Client APK (Android) built & installed<br>• CameraView scan with reticle & haptics<br>• Debounced nav → `/register/[id]`<br>• `react-query` + Zod runtime validation<br>• Loading / error UI<br>• `fetchProduct()` stub + env‐driven `API_BASE` | Waiting on live `/products/{gtin}` |
| **2 — Product Lookup Service** | External API / web search, local cache, GS1 parsing | ⏳ _pending_ | Celery task chain, SQLite cache, `/products/{gtin}` returns JSON | kicks off after Phase 1 endpoint skeleton |
| **3 — Auth & Multi-tenant** | JWT, user/org tables, role-based register | ⏳ | Secure endpoints, mobile login flow |   |
| **4 — SDS Parsing Pipeline** | pdfplumber ➜ Camelot ➜ OCR fallback, section extraction, confidence scores | ⏳ | Celery stages 3-9, file storage, SDS model | depends on Phase 2 |
| **5 — Mobile v1 (Beta)** | Offline cache, SDS viewer, register editing | ⏳ | EAS “preview” builds, OTA updates |   |
| **6 — Production Release** | CI/CD, Play Store & App Store, monitoring | ⏳ | Stable channel, E2E tests |   |

---

## Detailed Task Checklist

### ✅ Completed this sprint
- **Expo Dev Client** built with New Architecture (SDK 53).
- **Core libraries**: `expo-camera`, `expo-file-system`, `@tanstack/react-query`, `zod`, `expo-haptics`.
- **Barcode scan screen**
  - Live reticle + cross-hair overlay.
  - Haptic vibration & “✓ Scanned” banner.
  - Debounced navigation.
- **Register screen v0**
  - React-Query spinner / error handling.
  - Zod-validated `Product` schema.
  - Styles migrated to `StyleSheet.create`.
- **API layer**
  - `src/lib/api.ts` with env-configurable `EXPO_PUBLIC_API_BASE`.
  - Timeout & friendly error messages.
  - Temporary stub enabled when endpoint absent.
- **Backend**
  - `src/chemfetch/api/main.py` with `FastAPI(title="ChemFetch API")`.
  - `/health` OK.
  - Host binding `0.0.0.0` & CORS notes.

### 🔜 Up Next (Phase 1-b remaining)
- [ ] Implement **stub `/products/{gtin}`** in FastAPI for initial data (returns mock JSON).
- [ ] Swap mobile stub for real `fetchProduct` once above route live.
- [ ] Add **open SDS PDF** button (WebView or external link).
- [ ] Basic **local cache** (React-Query persistence or `expo-sqlite`).
- [ ] EAS **preview build** (channel `preview`) for tester feedback.

### 🚧 Blockers / Decisions
- Choose external product/SDS data source or build manual vendor mapping.
- Finalise DB schema for `product` & `register_entry` before Phase 2 task chain.

---

**How to update**

```bash
# overwrite file
nano MILESTONE.md   # or your editor of choice
# commit
git add MILESTONE.md
git commit -m "docs: update milestone after mobile alpha progress"
git push
