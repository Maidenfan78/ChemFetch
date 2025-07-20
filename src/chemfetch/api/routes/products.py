from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional

router = APIRouter(prefix="/products", tags=["products"])


class Product(BaseModel):
    id: int
    gtin: str
    name: str
    vendor: Optional[str] = None
    sds_url: Optional[str] = None
    last_revision: Optional[str] = None


# Temporary in-memory database
_FAKE_PRODUCTS: dict[str, Product] = {
    "9311111111111": Product(
        id=1,
        gtin="9311111111111",
        name="Sample Solvent",
        vendor="ChemCorp",
        sds_url="https://example.com/sds/sample.pdf",
        last_revision="2024-01-01",
    )
}


def _trigger_sds_retrieval(gtin: str) -> None:
    """Placeholder for asynchronous SDS retrieval."""
    # TODO: integrate Celery task
    print(f"[stub] fetching SDS for {gtin}")


@router.get("/{gtin}", response_model=Product)
async def lookup_product(gtin: str) -> Product:
    """Return product details or trigger SDS retrieval if unknown."""
    product = _FAKE_PRODUCTS.get(gtin)
    if product:
        return product

    _trigger_sds_retrieval(gtin)
    raise HTTPException(status_code=404, detail="Product not found")
