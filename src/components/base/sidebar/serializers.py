from rest_framework import serializers

from ..management.serializers import NavigationItemSerializer
from .models import Sidebar


class SidebarSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = Sidebar
        fields = "__all__"
