from rest_framework.routers import DefaultRouter

from .views import CTAViewSet

router = DefaultRouter()
router.register(r"cta", CTAViewSet)

urlpatterns = router.urls
