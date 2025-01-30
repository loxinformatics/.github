from rest_framework.routers import DefaultRouter

from .views import HeaderHeroViewSet

router = DefaultRouter()
router.register(r"headerhero", HeaderHeroViewSet)

urlpatterns = router.urls
