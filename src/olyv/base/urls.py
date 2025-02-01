from pathlib import Path

from .management.utils import process_urls

urlpatterns = process_urls("src.olyv.base", Path(__file__).resolve().parent, [])
