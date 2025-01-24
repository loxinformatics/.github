from rest_framework.routers import DefaultRouter

from .views import (
    AboutViewSet,
    BaseViewSet,
    ContactViewSet,
    CTAViewSet,
    HeaderHeroViewSet,
    ListDescriptionsViewSet,
    MailViewSet,
)

router = DefaultRouter()
router.register("", BaseViewSet, basename="base")
router.register(r"mail", MailViewSet, basename="mail")
router.register(r"headerhero", HeaderHeroViewSet)
router.register(r"about", AboutViewSet)
router.register(r"cta", CTAViewSet)
router.register(r"contact", ContactViewSet)
router.register(r"listdescriptions", ListDescriptionsViewSet)


urlpatterns = router.urls
