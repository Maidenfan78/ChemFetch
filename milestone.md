# ChemFetch — Milestone Tracker

> *Last updated: 20 Jul 2025*

---

## ✅ Phase 0 — Project Bootstrap (DONE)

| Area | Deliverable |
|------|-------------|
| **Repo & Tooling** | Local `git init`, `.gitignore`, first commit, GitHub remote & push |
| **Python Env** | Poetry 3.11 environment with editable package path (`src/chemfetch`) |
| **Dependencies** | FastAPI, Uvicorn, Celery, Redis, SQLAlchemy/SQLModel, Alembic, dev‑tools (ruff, mypy, pytest, pre‑commit) |
| **Project Layout** | `src/chemfetch/` package scaffold with `api/`, `tasks/`, etc. |
| **FastAPI Skeleton** | `/health` endpoint returning `{status:"ok"}` & auto‑reload dev server |
| **Celery Skeleton** | `celery_app` in `tasks/app.py`, Redis broker/back‑end, demo task `add(x,y)` |
| **Local Validation** | ✔ Uvicorn health probe<br>✔ Celery worker registers `chemfetch.add` and returns correct result |

---

## 🔜 Phase 1 — Minimal SDS Flow (In Progress)

### API
- [ ] **`POST /sds`** – upload PDF, save temp file, enqueue background parse task, return job ID
- [ ] **`GET /sds/{id}`** – job status & parsed metadata JSON

### Background Tasks
- [ ] `parse_sds_pdf` Celery task (pipeline Stage 1‑3)
  - ingest → detect_layout → extract_text_tables
- [ ] Store intermediate status in DB (`processing`, `failed`, `completed`)

### Database
- [ ] `SdsDocument` model (id, original_filename, status, created_at, updated_at, etc.)
- [ ] Alembic **initial migration** & upgrade to head

### Dev Experience / QA
- [ ] Pytest fixture for Celery (`task_always_eager=True`) + unit test for `/sds` happy‑path
- [ ] CI workflow step to spin up Redis service for tests

---

## 📌 Phase 2 — Full Parsing & Normalisation

| Component | Key Tasks |
|-----------|-----------|
| **Parsing Pipeline** | Implement remaining state‑machine stages: `camelot_stream_retry`, `ocr_tesseract`, optional `layoutlmv3_advanced`, `normalize_fields`, `confidence_scoring`, `persist_and_index` |
| **Data Models** | Table & Section entities, per‑field confidence, fallback flags |
| **Storage** | PDF blob retention policy, text + table JSON storage |
| **Error Handling** | Structured error JSON (`{error_code, stage, attempted_paths}`) |

---

## 🚀 Phase 3 — Production Hardening

- Docker Compose service images & health‑checks
- Configurable settings via `pydantic‑settings` & `.env`
- Structured JSON logging with correlation IDs
- Pre‑commit formatting & lint enforcement in CI
- Swagger/OpenAPI docs polish
- Metrics collection (parse_time_ms, ocr_fallback_rate, etc.)

---

## 🛣 Phase 4 — Stretch Goals

- Front‑end dashboard (React or Streamlit) for upload & document browser
- LayoutLMv3 ML upgrade gated behind metrics
- Role‑based auth (FastAPI Users / JWT)
- S3 / Azure Blob storage abstraction for SDS PDFs
- Horizontal scaling (Celery + Flower monitoring, Kubernetes)

---

### Legend
- **✅ Done** — implemented & validated
- **🔜 Next up** — current sprint focus
- **📌 Planned** — defined but not started
- **🚀 Stretch** — nice‑to‑have / future capability

---

*Feel free to check items off or re‑order as priorities shift.*

