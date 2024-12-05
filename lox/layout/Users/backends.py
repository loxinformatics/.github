from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from rest_framework.exceptions import ValidationError


class UsernameOrEmailBackend(ModelBackend):
    """
    Custom authentication backend to allow login with either username or email,
    and filter by label.
    """

    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()

        if username is None or password is None:
            raise ValidationError("Username / email, and passwordare required fields")

        try:
            # Try to fetch the user by username
            user = UserModel.objects.get(username=username)
        except UserModel.DoesNotExist:
            try:
                # Try to fetch the user by email
                user = UserModel.objects.get(email=username)
            except UserModel.DoesNotExist:
                raise ValidationError(
                    "No active account found with the given credentials"
                )

        # Check the password
        if not user.check_password(password):
            raise ValidationError("Incorrect password")

        return user

    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(pk=user_id)
        except UserModel.DoesNotExist:
            return None
