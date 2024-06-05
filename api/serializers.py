from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from .models import Root, User
from .forms import MailUsForm


# ****************************** root ********************************


class RootSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Root
        fields = "__all__"

    def to_representation(self, instance):
        data = super().to_representation(instance)
        request = self.context.get("request", None)

        # Define the required permissions
        required_permissions = [
            "api.view_root",
            "api.change_root",
        ]

        # Remove the URL field if the request exists and either the user is not authenticated
        # or does not have the required model permissions
        if request and (
            not request.user.is_authenticated
            or not request.user.has_perms(required_permissions)
        ):
            data.pop("url", None)

        return data


# ****************************** users & groups ********************************


class UserSerializer(serializers.HyperlinkedModelSerializer):
    password = serializers.CharField(
        write_only=True, required=False, style={"input_type": "password"}
    )

    class Meta:
        model = User
        fields = (
            "url",
            "role",
            "username",
            "password",
            "first_name",
            "last_name",
            "image",
        )

    def create(self, validated_data):
        validated_data["password"] = make_password(validated_data.get("password"))
        return super().create(validated_data)

    def update(self, instance, validated_data):
        if "password" in validated_data:
            validated_data["password"] = make_password(validated_data.get("password"))
        return super().update(instance, validated_data)


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ["url", "name"]


# ****************************** auth ********************************


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token["username"] = user.username
        token["role"] = user.role
        return token

    """
    Override the validate method to add validation for the role field as well
    """
    role = serializers.ChoiceField(choices=User.Role.choices, write_only=True)

    def validate(self, attrs):
        data = {}

        username = attrs.get("username")
        password = attrs.get("password")
        role = attrs.get("role")

        user = authenticate(username=username, password=password, role=role)

        # Custom claims
        refresh = self.get_token(user)

        data["refresh"] = str(refresh)
        data["access"] = str(refresh.access_token)

        return data


# ****************************** mail us ********************************


class MailSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100)
    sender_email = serializers.EmailField()
    subject = serializers.CharField()
    message = serializers.CharField()

    def validate(self, data):
        form = MailUsForm(data)
        if not form.is_valid():
            raise serializers.ValidationError(form.errors)

        try:
            form.send_email()
        except Exception as e:
            raise serializers.ValidationError(f"An error occurred: {e}")

        return data
