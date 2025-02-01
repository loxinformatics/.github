from rest_framework.routers import DefaultRouter

from .views import ContactUsFormViewSet, ContactViewSet

router = DefaultRouter()
router.register(r"contact", ContactViewSet)
router.register(r"mail/us", ContactUsFormViewSet, basename="mail_us")

urlpatterns = router.urls
