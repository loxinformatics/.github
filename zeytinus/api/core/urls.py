from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AboutViewSet,
    ContactViewSet,
    CTAViewSet,
    HeaderHeroViewSet,
    ListDescriptionsViewSet,
)

router = DefaultRouter()
router.register(r"headerhero", HeaderHeroViewSet)
router.register(r"about", AboutViewSet)
router.register(r"cta", CTAViewSet)
router.register(r"contact", ContactViewSet)
router.register(r"listdescriptions", ListDescriptionsViewSet)


urlpatterns = [
    path("", include(router.urls)),
]
