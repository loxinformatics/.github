from rest_framework.routers import DefaultRouter

from .views import BaseViewSet, MailViewSet

router = DefaultRouter()

router.register("", BaseViewSet, basename="base")
router.register(r"mail", MailViewSet, basename="mail")

urlpatterns = router.urls
