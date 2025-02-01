from rest_framework.routers import DefaultRouter

from .views import AsideViewSet

router = DefaultRouter()
router.register(r"aside", AsideViewSet)

urlpatterns = router.urls
