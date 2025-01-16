from rest_framework import serializers

from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ItemDescription,
    ListSection,
)

class HeaderHeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeaderHeroSection
        exclude = model.TITLE_FIELDS


class AboutSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = "__all__"


class CTASerializer(serializers.ModelSerializer):
    class Meta:
        model = CallToActionSection
        exclude = model.TITLE_FIELDS


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSection
        fields = "__all__"


class ItemDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ItemDescription
        exclude = ("list_description",)


class ListDescriptionsSerializer(serializers.ModelSerializer):
    items = ItemDescriptionSerializer(many=True, read_only=True)

    class Meta:
        model = ListSection
        fields = "__all__"
