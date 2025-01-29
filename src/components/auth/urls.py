from django.conf import settings
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import GroupViewSet, UserViewSet

router = DefaultRouter()
router.register(r"groups", GroupViewSet)
router.register(r"users", UserViewSet)

urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += [
        path("rest/", include("rest_framework.urls", namespace="rest_framework"))
    ]
