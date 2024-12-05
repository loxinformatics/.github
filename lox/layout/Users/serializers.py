from django.contrib.auth.models import Group
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import Administrator, CustomUser, StandardUser

# ============================ CUSTOM USER SERIALIZERS ============================


class CustomUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = CustomUser
        exclude = ["password", "groups"]


# ============================ ADMINISTRATOR SERIALIZER============================


class AdministratorSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Administrator
        exclude = ["password", "groups"]


# ============================ STUDENT SERIALIZAER ============================


class StandardUserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = StandardUser
        exclude = ["password", "groups"]


# ============================ GROUP SERIALIZAER ============================


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        exclude = ["permissions"]


# ============================ JWT TOKEN SERIALIZER ============================


class TokenSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer to include additional claims in the token besides the default user id.
    """

    @classmethod
    def get_token(cls, user):
        """
        Add custom claims to the access token.
        """
        token = super().get_token(user)

        # Add custom claims to the access_token
        token["username"] = user.username
        token["email"] = user.email
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["role"] = user.role
        return token
