from __future__ import annotations

from datetime import date
import httpx

from .app import celery_app
from chemfetch.db.session import SessionLocal
from chemfetch.models import Product, SDSDocument


@celery_app.task(name="chemfetch.fetch_sds")  # type: ignore[misc]
def fetch_sds(gtin: str) -> None:
    """Retrieve product metadata and SDS and persist them."""
    # Placeholder HTTP request - replace with real vendor API call
    with httpx.Client() as client:
        try:
            resp = client.get(f"https://example.com/products/{gtin}")
            data = resp.json()
        except Exception:
            # Fallback dummy data
            data = {
                "name": f"Product {gtin}",
                "vendor": "Unknown",
                "sds_url": "https://example.com/sds/sample.pdf",
                "revision_date": "2024-01-01",
            }

    with SessionLocal() as session:
        product = Product(
            gtin=gtin,
            name=data["name"],
            vendor=data.get("vendor"),
            sds_url=data.get("sds_url"),
            last_revision=date.fromisoformat(data["revision_date"]),
        )
        session.add(product)
        session.commit()
        session.refresh(product)

        sds = SDSDocument(
            product_id=product.id,
            url=product.sds_url or "",
            revision_date=product.last_revision or date.today(),
        )
        session.add(sds)
        session.commit()
