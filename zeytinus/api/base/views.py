from django.conf import settings
from django.core.mail import EmailMultiAlternatives
from django.db import connection
from django.middleware.csrf import get_token
from django.template.loader import render_to_string
from rest_framework import response, status, viewsets
from rest_framework.decorators import action

from .models import ContactInfo, Metadata
from .serializers import MailSerializer


class BaseViewSet(viewsets.ViewSet):
    def list(self, request):
        meta = Metadata.objects.first()
        contact = ContactInfo.objects.first()

        if not meta or not contact:
            return response.Response(
                {"detail": "No base data (metadata or contact information) available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        base_data = {
            "csrf_token": get_token(request),
            "full_name": meta.full_name,
            "short_name": meta.short_name,
            "motto": meta.motto,
            "theme_color": meta.theme_color,
            "colored_logo_full_image": request.build_absolute_uri(
                meta.colored_logo_full_image.url
            )
            if meta.colored_logo_full_image
            else None,
            "colored_logo_mini_image": request.build_absolute_uri(
                meta.colored_logo_mini_image.url
            )
            if meta.colored_logo_mini_image
            else None,
            "light_logo_full_image": request.build_absolute_uri(
                meta.light_logo_full_image.url
            )
            if meta.light_logo_full_image
            else None,
            "light_logo_mini_image": request.build_absolute_uri(
                meta.light_logo_mini_image.url
            )
            if meta.light_logo_mini_image
            else None,
            "dark_logo_full_image": request.build_absolute_uri(
                meta.dark_logo_full_image.url
            )
            if meta.dark_logo_full_image
            else None,
            "dark_logo_mini_image": request.build_absolute_uri(
                meta.dark_logo_mini_image.url
            )
            if meta.dark_logo_mini_image
            else None,
            # Add contact fields directly
            "primary_phone": contact.primary_phone,
            "secondary_phone": contact.secondary_phone,
            "primary_email": contact.primary_email,
            "secondary_email": contact.secondary_email,
            "city_name": contact.city_name,
            "PO_box": contact.PO_box,
            "street": contact.street,
            "open_days": contact.open_days,
            "open_hours": contact.open_hours,
            "map": contact.map,
            "social_media_links_version": contact.social_media_links_version,
            "facebook": contact.facebook,
            "instagram": contact.instagram,
            "twitter_x": contact.twitter_x,
            "linkedin": contact.linkedin,
            "spotify": contact.spotify,
        }

        return response.Response(base_data)

    @action(detail=False, methods=["get"])
    def metadata(self, request):
        meta = Metadata.objects.first()

        if not meta:
            return response.Response(
                {"detail": "No metadata available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        base_data = {
            "full_name": meta.full_name,
            "motto": meta.motto,
            "website": meta.motto,
            "favicon": request.build_absolute_uri(meta.favicon.url)
            if meta.favicon
            else None,
            "apple_touch_icon": request.build_absolute_uri(meta.apple_touch_icon.url)
            if meta.apple_touch_icon
            else None,
            "og_image": request.build_absolute_uri(meta.og_image.url)
            if meta.og_image
            else None,
            "twitter_image": request.build_absolute_uri(meta.twitter_image.url)
            if meta.twitter_image
            else None,
        }

        return response.Response(base_data)

    @action(detail=False, methods=["get"])
    def manifest(self, request):
        meta = Metadata.objects.first()

        if not meta:
            return response.Response(
                {"detail": "No metadata for creating manifest available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        manifest_data = {
            "full_name": meta.full_name,
            "short_name": meta.short_name,
            "motto": meta.motto,
            "background_color": meta.background_color,
            "theme_color": meta.theme_color,
            "pwa_192": request.build_absolute_uri(meta.pwa_192.url)
            if meta.pwa_192
            else None,
            "pwa_512": request.build_absolute_uri(meta.pwa_512.url)
            if meta.pwa_512
            else None,
            "apple_touch_icon": request.build_absolute_uri(meta.apple_touch_icon.url)
            if meta.apple_touch_icon
            else None,
        }
        return response.Response(manifest_data)


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
                    ContactInfo.objects.first()
                    if ContactInfo._meta.db_table
                    in connection.introspection.table_names()
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
