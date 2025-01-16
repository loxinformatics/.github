from rest_framework import serializers

from .forms import MailForm

TITLE_FIELDS = ["title_version", ""]

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
