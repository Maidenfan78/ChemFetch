# filepath: src/chemfetch/tasks/demo.py
from .app import celery_app


@celery_app.task(name="chemfetch.add")  # type: ignore[misc]
def add(x: int, y: int) -> int:
    """Add two numbers asynchronously."""
    return x + y
