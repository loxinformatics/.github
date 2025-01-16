from rest_framework.routers import SimpleRouter

from .views import BaseViewSet, MailViewSet

router = SimpleRouter()
router.register("", BaseViewSet, basename="base")
router.register(r"mail", MailViewSet, basename="mail")

urlpatterns = router.urls

