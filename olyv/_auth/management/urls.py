from pathlib import Path

from django.urls import include, path

from ...base.management.utils import process_urls

current_file = Path(__file__).resolve()
parent_dir = current_file.parent.parent

urlpatterns = [
    path("rest/", include("rest_framework.urls", namespace="rest_framework")),
] + process_urls("olyv._auth", parent_dir, [], current_file)
