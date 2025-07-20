# filepath: src/chemfetch/api/main.py
from fastapi import FastAPI

from .routes import products

app = FastAPI(title="ChemFetch API")

app.include_router(products.router)


@app.get("/health", tags=["utils"])
async def health() -> dict[str, str]:
    return {"status": "ok"}
