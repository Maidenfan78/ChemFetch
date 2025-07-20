from fastapi import APIRouter
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional
from sqlmodel import select

from chemfetch.db.session import SessionLocal
from chemfetch.models import Product as ProductModel
from chemfetch.tasks.fetch_sds import fetch_sds

router = APIRouter(prefix="/products", tags=["products"])


class Product(BaseModel):
    id: int
    gtin: str
    name: str
    vendor: Optional[str] = None
    sds_url: Optional[str] = None
    last_revision: Optional[str] = None


@router.get("/{gtin}", response_model=Product)
async def lookup_product(gtin: str):
    """Return product details or trigger SDS retrieval if unknown."""
    with SessionLocal() as session:
        stmt = select(ProductModel).where(ProductModel.gtin == gtin)
        db_product = session.exec(stmt).first()
        if db_product:
            return Product(
                id=db_product.id,
                gtin=db_product.gtin,
                name=db_product.name,
                vendor=db_product.vendor,
                sds_url=db_product.sds_url,
                last_revision=(
                    db_product.last_revision.isoformat()
                    if db_product.last_revision
                    else None
                ),
            )

    fetch_sds.delay(gtin)
    return JSONResponse(status_code=202, content={"detail": "Retrieving SDS"})
