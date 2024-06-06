from rest_framework import serializers
from .models import Contact
from .forms import MailUsForm


class ContactSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the Contact model.
    """

    class Meta:
        model = Contact
        fields = "__all__"

    def to_representation(self, instance):
        """
        Custom representation method to remove the URL field based on permissions.
        """
        data = super().to_representation(instance)
        request = self.context.get("request", None)

        # Define the required permissions
        required_permissions = [
            "contact.view_root",
            "contact.change_root",
        ]

        # Check permissions and remove URL field if necessary
        if request:
            user = request.user
            is_authenticated = user.is_authenticated
            has_permissions = user.has_perms(required_permissions)
            if not is_authenticated or not has_permissions:
                data.pop("url", None)

        return data


class MailSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    sender_email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()
    recipient_email = serializers.EmailField()

    def validate(self, data):
        form = MailUsForm(data)
        if not form.is_valid():
            raise serializers.ValidationError(form.errors)
        return data
