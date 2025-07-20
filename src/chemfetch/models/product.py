from typing import Optional
from sqlmodel import SQLModel, Field
from datetime import date


class Product(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    gtin: str = Field(index=True, unique=True)
    name: str
    vendor: Optional[str] = None
    sds_url: Optional[str] = None
    last_revision: Optional[date] = None
