from django.core.management.base import BaseCommand
from django.core.management.utils import get_random_secret_key


class Command(BaseCommand):
    help = "Generate a new Django SECRET_KEY"

    def handle(self, *args, **kwargs):
        secret_key = get_random_secret_key()
        self.stdout.write(self.style.SUCCESS(f"Your new secret key: {secret_key}"))
