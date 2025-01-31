from rest_framework import serializers

from .models import CTA


class CTASerializer(serializers.ModelSerializer):
    class Meta:
        model = CTA
        exclude = model.TITLE_FIELDS
