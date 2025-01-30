from rest_framework import viewsets

from .models import ListSection
from .serializers import ListSectionSerializer


class ListViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ListSection.objects.all()
    serializer_class = ListSectionSerializer
