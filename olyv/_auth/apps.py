from pathlib import Path

from django.apps import AppConfig

from ..base.management.utils import import_app_modules


class AuthConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "olyv._auth"
    parent_dir = Path(__file__).resolve().parent

    def ready(self):
        import_app_modules(self.name, "models.py", self.parent_dir, [])
        import_app_modules(self.name, "admin.py", self.parent_dir, [])
