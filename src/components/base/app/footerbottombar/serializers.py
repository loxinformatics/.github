from rest_framework import serializers

from ...widgets.nav.serializers import NavigationItemSerializer
from .models import FooterBottombar


class FooterBottombarSerializer(serializers.ModelSerializer):
    navigation_items = NavigationItemSerializer(many=True, read_only=True)

    class Meta:
        model = FooterBottombar
        exclude = model.TITLE_FIELDS
