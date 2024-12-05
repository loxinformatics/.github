from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import SocialLinks
from .serializers import SocialLinkSerializer


class SocialLinkViewSet(ReadOnlyModelViewSet):
    queryset = SocialLinks.objects.all()
    serializer_class = SocialLinkSerializer
