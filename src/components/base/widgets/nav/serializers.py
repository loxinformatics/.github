from rest_framework import serializers

from .models import NavigationItem


class NavigationItemSerializer(serializers.ModelSerializer):
    children = serializers.SerializerMethodField()

    class Meta:
        model = NavigationItem
        exclude = [
            "header_section",
            "footer_section",
            "sidebar_section",
            "section_type",
        ]

    def get_children(self, obj):
        if obj.children.exists():
            return NavigationItemSerializer(obj.children.all(), many=True).data
        return None
