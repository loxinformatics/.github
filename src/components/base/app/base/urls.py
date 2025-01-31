from rest_framework.routers import DefaultRouter

from .views import BaseViewSet

router = DefaultRouter()

router.register("", BaseViewSet, basename="base")

urlpatterns = router.urls
