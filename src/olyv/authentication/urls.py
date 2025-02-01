from pathlib import Path

from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from ..base.management.utils import process_urls

urlpatterns = [
    path("rest/", include("rest_framework.urls", namespace="rest_framework")),
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
] + process_urls("src.olyv.auth", Path(__file__).resolve().parent, [])
