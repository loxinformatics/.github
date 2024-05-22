from django import forms
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string


# ****************************** mail ********************************


class MailForm(forms.Form):
    """
    A Django form for handling contact form submissions via email.
    """

    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(),
    )
    sender_email = forms.EmailField(
        widget=forms.EmailInput(),
    )
    subject = forms.CharField(
        max_length=200,
        widget=forms.TextInput(),
    )
    message = forms.CharField(
        widget=forms.Textarea(),
    )
    recipient_email = forms.EmailField(  # company email
        widget=forms.HiddenInput(),
    )

    def send_email(self, request):
        name = self.cleaned_data["name"]
        email = self.cleaned_data["email"]
        subject = self.cleaned_data["subject"]
        message = self.cleaned_data["message"]
        recipient_email = self.cleaned_data["recipient_email"]

        email_context = {
            "name": name,
            "email": email,
            "subject": subject,
            "message": message,
        }

        text_content = render_to_string("api/mail-us.txt", email_context)
        html_content = render_to_string("api/mail-us.html", email_context)

        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.EMAIL_HOST_USER,  # not using the sender's email but the notifications email to send the message
            [recipient_email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
