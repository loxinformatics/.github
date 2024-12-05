from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import connection
from django.template.loader import render_to_string

from lox.layout.Contact.models import Contact


def send_mail(data):
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

        text_content = render_to_string("Contact/mail.txt", email_context)
        html_content = render_to_string("Contact/mail.html", email_context)

        # Fetch the singleton Contact instance
        contact = (
            Contact.objects.first()
            if Contact._meta.db_table in connection.introspection.table_names()
            else None
        )

        if not contact:
            raise ValueError("No Contact instance found. Cannot send email.")

        # Sending the email
        msg = EmailMultiAlternatives(
            subject,
            text_content,
            settings.EMAIL_HOST_USER,
            [contact.primary_email],
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()

    except Exception as e:
        raise ValueError(f"An error occurred while sending the email: {e}")
