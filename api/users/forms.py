from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import User


class UserForm(UserChangeForm):
    password = forms.CharField(widget=forms.PasswordInput(), required=False)

    class Meta:
        model = User
        fields = "__all__"
