from rest_framework.serializers import HyperlinkedModelSerializer

from .models import SocialLinks


class SocialLinkSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = SocialLinks
        fields = "__all__"
