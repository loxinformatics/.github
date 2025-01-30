from rest_framework import serializers

from .models import CallToActionSection


class CTASectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CallToActionSection
        exclude = model.TITLE_FIELDS
