from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class TokenSerializer(TokenObtainPairSerializer):
    """
    Custom token serializer to include additional claims in the token besides the default user id.
    """

    @classmethod
    def get_token(cls, user):
        """
        Add custom claims to the token.
        """
        token = super().get_token(user)

        # Add custom claims to the access_token
        token["username"] = user.username
        token["email"] = user.email
        token["role"] = user.role
        return token
