# filepath: src/chemfetch/tasks/demo.py
from .app import celery_app


@celery_app.task  # type: ignore[misc]
def add(x: int, y: int) -> int:
    return x + y
