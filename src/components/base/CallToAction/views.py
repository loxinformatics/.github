from rest_framework import viewsets

from .models import CallToActionSection
from .serializers import CTASectionSerializer


class CTAViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CallToActionSection.objects.all()
    serializer_class = CTASectionSerializer
