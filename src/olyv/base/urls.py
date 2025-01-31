from pathlib import Path

from django.contrib import admin
from django.urls import path

from .management.utils import process_urls

urlpatterns = [
    path("admin/", admin.site.urls),
] + process_urls("src.olyv.base", Path(__file__).resolve().parent, [])
