from __future__ import annotations

import os
from sqlmodel import SQLModel, Session, create_engine as _create_engine
from sqlalchemy.engine import Engine

_engine: Engine | None = None


def create_engine(url: str | None = None) -> Engine:
    """Create or return a cached SQLModel engine."""
    global _engine
    if _engine is None:
        if url is None:
            url = os.getenv("DATABASE_URL", "sqlite:///./chemfetch.db")
        _engine = _create_engine(url, echo=False)
        SQLModel.metadata.create_all(_engine)
    return _engine


def SessionLocal() -> Session:
    """Return a new Session using the cached engine."""
    engine = create_engine()
    return Session(engine)
