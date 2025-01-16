from rest_framework import viewsets

from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ListSection,
)
from .serializers import (
    AboutSerializer,
    ContactSerializer,
    CTASerializer,
    HeaderHeroSerializer,
    ListDescriptionsSerializer,
)


class HeaderHeroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeaderHeroSection.objects.all()
    serializer_class = HeaderHeroSerializer


class AboutViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSerializer


class CTAViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CallToActionSection.objects.all()
    serializer_class = CTASerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactSection.objects.all()
    serializer_class = ContactSerializer


class ListDescriptionsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ListSection.objects.all()
    serializer_class = ListDescriptionsSerializer
