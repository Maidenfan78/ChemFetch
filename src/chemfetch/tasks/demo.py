# filepath: src/chemfetch/tasks/demo.py
from .app import celery_app


@celery_app.task
def add(x, y):
    return x + y
