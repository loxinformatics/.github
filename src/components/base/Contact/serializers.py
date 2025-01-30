from rest_framework import serializers

from .models import ContactSection


class ContactSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactSection
        fields = "__all__"
