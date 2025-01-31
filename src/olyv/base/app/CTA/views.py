from rest_framework import viewsets

from .models import CTA
from .serializers import CTASerializer


class CTAViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CTA.objects.all()
    serializer_class = CTASerializer
