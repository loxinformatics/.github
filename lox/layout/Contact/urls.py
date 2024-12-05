from django.urls import include, path
from rest_framework.routers import SimpleRouter

from .views import ContactViewSet

router = SimpleRouter()
router.register(r"", ContactViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
