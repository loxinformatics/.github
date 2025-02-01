from rest_framework import serializers

from ...widgets.nav.serializers import NavigationItemSerializer
from .models import Aside


class AsideSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = Aside
        fields = "__all__"
