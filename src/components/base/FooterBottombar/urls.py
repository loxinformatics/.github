from rest_framework.routers import DefaultRouter

from .views import FooterBottombarViewSet

router = DefaultRouter()
router.register(r"footerbottombar", FooterBottombarViewSet)

urlpatterns = router.urls
