from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import About
from .serializers import AboutSerializer


class AboutViewSet(ReadOnlyModelViewSet):
    queryset = About.objects.all()
    serializer_class = AboutSerializer
