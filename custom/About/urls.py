from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import AboutViewSet

router = SimpleRouter()
router.register(r"", AboutViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
