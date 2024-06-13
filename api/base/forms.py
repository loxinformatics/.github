from django import forms


class MailUsForm(forms.Form):
    """
    A Django form for handling contact form submissions via email.
    """

    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(),
        error_messages={"required": "Please provide your name."},
    )
    sender_email = forms.EmailField(
        widget=forms.EmailInput(),
        error_messages={"required": "Please provide a valid sender email address."},
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
