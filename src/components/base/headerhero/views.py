from rest_framework import viewsets

from .models import HeaderHero
from .serializers import HeaderHeroSerializer


class HeaderHeroViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = HeaderHero.objects.all()
    serializer_class = HeaderHeroSerializer
