from django import forms


class MailForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(),
        error_messages={"required": "Please provide your name."},
    )
    email = forms.EmailField(
        widget=forms.EmailInput(),
        error_messages={"required": "Please provide a valid email address."},
    )
    subject = forms.CharField(
        max_length=200,
        widget=forms.TextInput(),
        error_messages={"required": "Please provide a subject for your message."},
    )
    message = forms.CharField(
        widget=forms.Textarea(),
        error_messages={"required": "Please enter your message."},
    )
