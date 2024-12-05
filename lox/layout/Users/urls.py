from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import (
    AdministratorViewSet,
    CustomUserViewSet,
    GroupViewSet,
    StandardUserViewSet,
)

router = SimpleRouter()
router.register(r"list", CustomUserViewSet)
router.register(r"administrators", AdministratorViewSet)
router.register(r"standard-users", StandardUserViewSet)
router.register(r"groups", GroupViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
