from rest_framework import viewsets

from .models import FooterBottombarSection
from .serializers import FooterBottombarSectionSerializer


class FooterBottombarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = FooterBottombarSection.objects.all()
    serializer_class = FooterBottombarSectionSerializer
