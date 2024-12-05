from rest_framework.serializers import HyperlinkedModelSerializer

from .models import Service


class ServiceSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Service
        fields = "__all__"
