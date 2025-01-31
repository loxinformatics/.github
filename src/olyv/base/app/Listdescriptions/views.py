from rest_framework import viewsets

from .models import ListDescriptions
from .serializers import ListDescriptionsSerializer


class ListDescriptionsViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ListDescriptions.objects.all()
    serializer_class = ListDescriptionsSerializer
