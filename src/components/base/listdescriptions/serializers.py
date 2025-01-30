from rest_framework import serializers

from .models import ItemDescription, ListDescriptions


class ItemDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemDescription
        exclude = ("list_descriptions",)


class ListDescriptionsSerializer(serializers.ModelSerializer):
    items = ItemDescriptionSerializer(many=True, read_only=True)

    class Meta:
        model = ListDescriptions
        fields = "__all__"
