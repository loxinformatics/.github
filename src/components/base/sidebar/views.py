from rest_framework import viewsets

from .models import Sidebar
from .serializers import SidebarSerializer


class SidebarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Sidebar.objects.all()
    serializer_class = SidebarSerializer
