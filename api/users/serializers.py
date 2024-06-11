from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from .models import AdminUser, RegularUser


class UserSerializer(serializers.HyperlinkedModelSerializer):
    """
    Base serializer for account-related models.
    """

    class Meta:
        fields = (
            "url",
            "image",
            "username",
            "password",
            "first_name",
            "last_name",
        )

    password = serializers.CharField(
        write_only=True, required=False, style={"input_type": "password"}
    )

    def create(self, validated_data):
        """
        Override create method so that new instances of users can have the passwords hashed.
        """
        validated_data["password"] = make_password(validated_data.get("password"))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        """
        Override create method so that updates on existing instances of users can have the passwords hashed.
        """
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data.get("password"))
        return super().update(instance, validated_data)


class AdminUserSerializer(UserSerializer):
    """
    Serializer for the Admin model.
    """

    class Meta(UserSerializer.Meta):
        model = AdminUser


class RegularUserSerializer(UserSerializer):
    """
    Serializer for the Regular model.
    """

    class Meta(UserSerializer.Meta):
        model = RegularUser


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    """
    Serializer for the Group model.
    """

    class Meta:
        model = Group
        fields = ["url", "name"]
