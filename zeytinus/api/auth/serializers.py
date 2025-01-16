from django.contrib.auth.models import Group, User
from rest_framework import serializers


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ["name"]

    def to_representation(self, instance):
        return instance.name


class UserSerializer(serializers.HyperlinkedModelSerializer):
    groups = serializers.SlugRelatedField(
        many=True,  # Specifies that the user can belong to multiple groups.
        read_only=True,  # Ensures the groups are read-only and can't be edited through the serializer.
        slug_field="name",  # Uses the 'name' field of the Group model to represent each group.
    )

    class Meta:
        model = User
        fields = [
            "url",
            "username",
            "email",
            "first_name",
            "last_name",
            "groups",  # The groups field is automatically handled by the SlugRelatedField. No need to import Group model
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["groups"] = list(representation["groups"])  # Ensure it's a list

        if instance.is_superuser and "SUPERUSER" not in representation["groups"]:
            representation["groups"].append("SUPERUSER")

        if instance.is_staff and "STAFF" not in representation["groups"]:
            representation["groups"].append("STAFF")

        representation["groups"].append("USER")


        return representation
