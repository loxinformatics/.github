from rest_framework import serializers

from ..management.serializers import NavigationItemSerializer
from .models import HeaderHero


class HeaderHeroSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = HeaderHero
        exclude = model.TITLE_FIELDS
