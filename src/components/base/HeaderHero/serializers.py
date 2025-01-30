from rest_framework import serializers

from ..management.serializers import NavigationItemSerializer
from .models import HeaderHeroSection


class HeaderHeroSectionSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = HeaderHeroSection
        exclude = model.TITLE_FIELDS
