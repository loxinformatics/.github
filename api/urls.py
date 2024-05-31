from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework import routers
from .views import BaseViewSet, UsersViewSet, GroupViewSet, MailUsViewSet


router = routers.DefaultRouter()
router.register(r"base", BaseViewSet)
router.register(r"users", UsersViewSet)
router.register(r"groups", GroupViewSet)
router.register(r"mail-us", MailUsViewSet, basename="mail-us")


urlpatterns = [
    path("auth/", include("rest_framework.urls", namespace="rest_framework")),
    path("auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path("", include(router.urls)),
]
