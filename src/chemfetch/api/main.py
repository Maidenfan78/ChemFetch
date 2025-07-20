# filepath: src/chemfetch/api/main.py
from fastapi import FastAPI

app = FastAPI(title="ChemFetch API")


@app.get("/health", tags=["utils"])
async def health():
    return {"status": "ok"}
