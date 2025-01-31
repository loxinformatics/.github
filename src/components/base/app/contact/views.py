from django.conf import settings
from django.db import connection
from rest_framework import response, status, viewsets
from rest_framework.decorators import action

from ...widgets.mail.serializers import MailFormSerializer
from ...widgets.mail.views import MailFormViewSet
from ..base.models import Base
from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer


class ContactUsFormViewSet(MailFormViewSet):
    @action(detail=False, methods=["post"])
    def us(self, request):
        """
        Get in touch with us by sending an email.
        """
        serializer = MailFormSerializer(data=request.data)
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
