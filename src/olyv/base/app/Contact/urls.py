from rest_framework.routers import DefaultRouter

from .views import ContactUsFormViewSet, ContactViewSet

router = DefaultRouter()
router.register(r"contact", ContactViewSet)
router.register(r"contact_us", ContactUsFormViewSet, basename="contact_us")

urlpatterns = router.urls
