from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import connection
from django.middleware.csrf import get_token
from django.template.loader import render_to_string
from rest_framework import response, status, viewsets
from rest_framework.decorators import action

from .models import Base
from .serializers import MailSerializer


class BaseViewSet(viewsets.ViewSet):
    def list(self, request):
        base = Base.objects.first()

        if not base:
            return response.Response(
                {"detail": "No base data available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "csrf_token": get_token(request),
            "full_name": base.full_name,
            "short_name": base.short_name,
            "motto_description": base.motto_description,
            "primary_color": base.primary_color,
            "colored_logo_full_image": request.build_absolute_uri(
                base.colored_logo_full_image.url
            )
            if base.colored_logo_full_image
            else None,
            "colored_logo_mini_image": request.build_absolute_uri(
                base.colored_logo_mini_image.url
            )
            if base.colored_logo_mini_image
            else None,
            "light_logo_full_image": request.build_absolute_uri(
                base.light_logo_full_image.url
            )
            if base.light_logo_full_image
            else None,
            "light_logo_mini_image": request.build_absolute_uri(
                base.light_logo_mini_image.url
            )
            if base.light_logo_mini_image
            else None,
            "dark_logo_full_image": request.build_absolute_uri(
                base.dark_logo_full_image.url
            )
            if base.dark_logo_full_image
            else None,
            "dark_logo_mini_image": request.build_absolute_uri(
                base.dark_logo_mini_image.url
            )
            if base.dark_logo_mini_image
            else None,
            # Add contact fields directly
            "primary_phone": base.primary_phone,
            "secondary_phone": base.secondary_phone,
            "primary_email": base.primary_email,
            "secondary_email": base.secondary_email,
            "city_name": base.city_name,
            "PO_box": base.PO_box,
            "street_address": base.street_address,
            "social_media_links_version": base.social_media_links_version,
            "facebook_URL": base.facebook_URL,
            "instagram_URL": base.instagram_URL,
            "X_URL": base.X_URL,
            "linkedin_URL": base.linkedin_URL,
            "spotify_URL": base.spotify_URL,
        }

        return response.Response(data)

    @action(detail=False, methods=["get"])
    def metadata(self, request):
        base = Base.objects.first()

        if not base:
            return response.Response(
                {"detail": "No base data available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "full_name": base.full_name,
            "motto_description": base.motto_description,
            "website_URL": base.website_URL,
            "favicon_image": request.build_absolute_uri(base.favicon_image.url)
            if base.favicon_image
            else None,
            "apple_image": request.build_absolute_uri(base.apple_image.url)
            if base.apple_image
            else None,
            "og_image": request.build_absolute_uri(base.og_image.url)
            if base.og_image
            else None,
            "X_image": request.build_absolute_uri(base.X_image.url)
            if base.X_image
            else None,
        }

        return response.Response(data)

    @action(detail=False, methods=["get"])
    def manifest(self, request):
        base = Base.objects.first()

        if not base:
            return response.Response(
                {"detail": "No base data available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "full_name": base.full_name,
            "short_name": base.short_name,
            "motto_description": base.motto_description,
            "pwa_192_image": request.build_absolute_uri(base.pwa_192_image.url)
            if base.pwa_192_image
            else None,
            "pwa_512_image": request.build_absolute_uri(base.pwa_512_image.url)
            if base.pwa_512_image
            else None,
            "apple_image": request.build_absolute_uri(base.apple_image.url)
            if base.apple_image
            else None,
        }
        return response.Response(data)


class MailViewSet(viewsets.ViewSet):
    """
    A base ViewSet for handling 'contact us' emails, and email operations that can be extended by other views.

    This ViewSet provides a foundation for email-related functionality through its
    `send_mail` static method. It is designed to be subclassed by specific email
    ViewSets that implement their own actions.

    Example:
        ```python
        class MailSupportViewSet(MailViewSet):
            @action(detail=False, methods=["post"])
            def support(self, request):
                # Implementation for sending support emails
                ...
        ```

    The base ViewSet handles the core email sending logic while allowing child
    ViewSets to specify their own:
    - Email templates
    - Recipient lists
    - Validation rules
    - Response handling
    """

    @staticmethod
    def send_mail(
        data: dict,
        sender_email: str,
        receiver_emails: list,
        text_template_path: str,
        html_template_path: str,
    ):
        """
        Send email with both text and HTML content.

        Args:
            data (dict): Contains email data (name, email, subject, message)
            sender_email (str): Email address of sender
            receiver_emails (list): List of recipient email addresses
            text_template_path (str): Path to text template
            html_template_path (str): Path to HTML template

        Raises:
            ValueError: If there's an error in sending the email
        """
        try:
            name = data.get("name", "")
            email = data.get("email", "")
            subject = data.get("subject", "")
            message = data["message"]

            email_context = {
                "name": name,
                "email": email,
                "subject": subject,
                "message": message,
            }

            text_content = render_to_string(text_template_path, email_context)
            html_content = render_to_string(html_template_path, email_context)

            msg = EmailMultiAlternatives(
                subject,
                text_content,
                sender_email,
                receiver_emails,
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()

        except Exception as e:
            raise ValueError(f"send_mail utility error: {e}")

    @action(detail=False, methods=["post"])
    def us(self, request):
        """
        Get in touch with us by sending an email.
        """
        serializer = MailSerializer(data=request.data)
        if serializer.is_valid():
            try:
                contact = (
                    Base.objects.first()
                    if Base._meta.db_table in connection.introspection.table_names()
                    else None
                )

                if not contact:
                    raise ValueError("No contact information available.")

                self.send_mail(
                    serializer.validated_data,
                    settings.EMAIL_HOST_USER,
                    [contact.primary_email],
                    "base/mail_us.txt",
                    "base/mail_us.html",
                )

                return response.Response(
                    {"detail": "Your message has been sent successfully. Thank you!"},
                    status=status.HTTP_200_OK,
                )
            except Exception as e:
                return response.Response(
                    {"detail": f"An error occurred while sending the email: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        else:
            return response.Response(
                serializer.errors, status=status.HTTP_400_BAD_REQUEST
            )
