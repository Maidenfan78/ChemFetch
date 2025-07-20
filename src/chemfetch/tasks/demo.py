# filepath: src/chemfetch/tasks/demo.py
from .app import celery_app


@celery_app.task(name="chemfetch.add")  # name is optional but nice
def add(x: int, y: int) -> int:
    return x + y
