from typing import Optional
from datetime import date
from sqlmodel import SQLModel, Field


class SDSDocument(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    product_id: int = Field(foreign_key="product.id")
    url: str
    revision_date: date
