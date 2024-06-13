from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings

from base.models import Base


def send_email(data):
    try:
        name = data["name"]
        sender_email = data["sender_email"]
        subject = data["subject"]
        message = data["message"]

        email_context = {
            "name": name,
            "sender_email": sender_email,
            "subject": subject,
            "message": message,
        }

        text_content = render_to_string("base/mail.txt", email_context)
        html_content = render_to_string("base/mail.html", email_context)

        base_instance = Base.objects.get(pk=1)
        recipient_email = base_instance.primary_email
        
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.EMAIL_HOST_USER,
            [recipient_email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    except Exception as e:
        raise ValueError(f"An error occurred while sending the email: {e}")
