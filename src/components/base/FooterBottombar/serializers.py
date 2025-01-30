from rest_framework import serializers

from ..management.serializers import NavigationItemSerializer
from .models import FooterBottombarSection


class FooterBottombarSectionSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = FooterBottombarSection
        exclude = model.TITLE_FIELDS
