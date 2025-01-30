from rest_framework.routers import DefaultRouter

from .views import SidebarViewSet

router = DefaultRouter()
router.register(r"sidebar", SidebarViewSet)

urlpatterns = router.urls
