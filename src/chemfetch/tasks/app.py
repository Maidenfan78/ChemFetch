# filepath: src/chemfetch/tasks/app.py
from celery import Celery

celery_app = Celery(
    "chemfetch",
    broker="redis://localhost:6379/0",
    backend="redis://localhost:6379/1",
    include=["chemfetch.tasks.demo"],  # 👈 Celery will import this on startup
)

# Optional: still allow later autodiscovery if you like
# celery_app.autodiscover_tasks(["chemfetch"])
