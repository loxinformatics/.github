from rest_framework import serializers

from .models import ListItem, ListSection


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        exclude = ("list_section",)


class ListSectionSerializer(serializers.ModelSerializer):
    items = ItemSerializer(many=True, read_only=True)

    class Meta:
        model = ListSection
        fields = "__all__"
