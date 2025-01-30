from rest_framework import viewsets

from .models import AboutSection
from .serializers import AboutSectionSerializer


class AboutViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AboutSection.objects.all()
    serializer_class = AboutSectionSerializer
