from rest_framework.serializers import HyperlinkedModelSerializer

from .models import About


class AboutSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = About
        fields = "__all__"
