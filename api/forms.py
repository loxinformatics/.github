from django import forms
from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from .models import Root


# ****************************** mail ********************************


class MailUsForm(forms.Form):
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

    def send_email(self):
        if not self.is_valid():
            raise ValueError("Form data is not valid")

        try:
            name = self.cleaned_data["name"]
            sender_email = self.cleaned_data["sender_email"]
            subject = self.cleaned_data["subject"]
            message = self.cleaned_data["message"]

            email_context = {
                "name": name,
                "email": sender_email,
                "subject": subject,
                "message": message,
            }

            text_content = render_to_string("api/mail-us.txt", email_context)
            html_content = render_to_string("api/mail-us.html", email_context)

            # Retrieve the recipient email from the Base model
            base_instance = Root.objects.get(pk=1)
            recipient_email = base_instance.primary_email

            msg = EmailMultiAlternatives(
                subject,
                text_content,
                settings.EMAIL_HOST_USER,  # not using the sender's email to send the email
                [recipient_email],
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()

        except Exception as e:
            raise ValueError(f"An error occurred while sending the email: {e}")
