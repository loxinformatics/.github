from rest_framework import serializers

from .forms import MailForm
from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ItemDescription,
    ListSection,
)


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
