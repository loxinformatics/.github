from rest_framework import serializers

from .forms import MailForm
from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    FooterBottombarSection,
    HeaderHeroSection,
    ListItem,
    ListSection,
    NavigationItem,
    SidebarSection,
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


class ItemDescriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ListItem
        exclude = ("list_section",)


class HeaderHeroSectionSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = HeaderHeroSection
        exclude = model.TITLE_FIELDS


class FooterBottombarSectionSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = FooterBottombarSection
        fields = "__all__"


class SidebarSectionSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = SidebarSection
        fields = "__all__"


class AboutSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutSection
        fields = "__all__"


class CTASectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallToActionSection
        exclude = model.TITLE_FIELDS


class ContactSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSection
        fields = "__all__"


class ListSectionSerializer(serializers.ModelSerializer):
    items = ItemDescriptionSerializer(many=True, read_only=True)

    class Meta:
        model = ListSection
        fields = "__all__"
