from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model
from django.forms import ValidationError
from .models import User


# ****************************** auth ********************************


class AuthBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, role=None, **kwargs):
        UserModel = get_user_model()

        try:
            user = UserModel.objects.get(username=username, role=role)
        except UserModel.DoesNotExist:
            try:
                user = UserModel.objects.get(username=username, role=User.Role.USER)
            except UserModel.DoesNotExist:
                raise ValidationError(
                    "No active account found with the given credentials"
                )
        if not user.check_password(password):
            raise ValidationError("Incorrect password")

        return user
