# filepath: src/chemfetch/tasks/app.py
from celery import Celery

celery_app = Celery(
    "chemfetch",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
)
celery_app.autodiscover_tasks(["chemfetch.tasks"])
