from django import forms
from django.contrib.auth.forms import UserChangeForm
from .models import Account


class AccountChangeForm(UserChangeForm):
    password = forms.CharField(widget=forms.PasswordInput(), required=False)

    class Meta:
        model = Account
        fields = "__all__"
