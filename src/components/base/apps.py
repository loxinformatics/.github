from pathlib import Path

from django.apps import AppConfig

from .utils import import_app_modules


class BaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "src.components.base"
    parent_dir = Path(__file__).resolve().parent

    def ready(self):
        import_app_modules(self.name, Path("models.py"), self.parent_dir, [])
        import_app_modules(self.name, Path("admin.py"), self.parent_dir, [])
