from rest_framework import serializers

from base.forms import MailUsForm
from base.models import Base


class BaseSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the Base model.
    """

    class Meta:
        model = Base
        fields = "__all__"

    def to_representation(self, instance):
        """
        Custom representation method to remove the URL field based on permissions.
        """
        data = super().to_representation(instance)
        request = self.context.get("request", None)

        # Define the required permissions
        required_permissions = [
            "base.view_root",
            "base.change_root",
        ]

        # Check permissions and remove URL field if necessary
        if request:
            user = request.user
            is_authenticated = user.is_authenticated
            has_permissions = user.has_perms(required_permissions)
            if not is_authenticated or not has_permissions:
                data.pop("url", None)

        return data



class MailUsSerializer(serializers.Serializer):
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
