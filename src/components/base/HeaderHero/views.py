from rest_framework import viewsets

from .models import HeaderHeroSection
from .serializers import HeaderHeroSectionSerializer


class HeaderHeroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeaderHeroSection.objects.all()
    serializer_class = HeaderHeroSectionSerializer
