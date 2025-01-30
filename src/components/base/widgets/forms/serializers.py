from rest_framework import serializers

from .forms import MailForm
from .mode import NavigationItem


class MailSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()

    def validate(self, data):
        form = MailForm(data)
        if not form.is_valid():
            raise serializers.ValidationError(form.errors)
        return data


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
