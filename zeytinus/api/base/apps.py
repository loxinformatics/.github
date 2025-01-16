from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "zeytinus.api.base"
    verbose_name = "Application (Base)"
