from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from rest_framework import viewsets

class MailFormViewSet(viewsets.ViewSet):
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
