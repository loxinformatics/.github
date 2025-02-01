from pathlib import Path

from .management.utils import process_urls

urlpatterns = process_urls("olyv.base", Path(__file__).resolve().parent, [])
