from rest_framework import viewsets

from .models import Aside
from .serializers import AsideSerializer


class AsideViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Aside.objects.all()
    serializer_class = AsideSerializer
