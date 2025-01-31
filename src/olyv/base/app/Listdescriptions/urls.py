from rest_framework.routers import DefaultRouter

from .views import ListDescriptionsViewSet

router = DefaultRouter()
router.register(r"list_descriptions", ListDescriptionsViewSet)

urlpatterns = router.urls
