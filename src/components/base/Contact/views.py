from rest_framework import viewsets

from .models import ContactSection
from .serializers import ContactSectionSerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ContactSection.objects.all()
    serializer_class = ContactSectionSerializer
