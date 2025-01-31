from rest_framework import viewsets

from .models import FooterBottombar
from .serializers import FooterBottombarSerializer


class FooterBottombarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FooterBottombar.objects.all()
    serializer_class = FooterBottombarSerializer
