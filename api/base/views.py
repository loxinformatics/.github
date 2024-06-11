from rest_framework import permissions, viewsets, status
from rest_framework.response import Response

from base.utils import send_email
from base.models import Base
from base.serializers import BaseSerializer, MailUsSerializer


class BaseViewSet(viewsets.ModelViewSet):
    """
    Company Basic Information.
    """

    queryset = Base.objects.all()
    serializer_class = BaseSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    def create(self, request, *args, **kwargs):
        """
        Custom create method to allow only one instance of Base.
        """
        if self.queryset.exists():
            return Response(
                {"detail": "Only one instance of Base is allowed."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        """
        Custom destroy method to disallow deletion of Base instance.
        """
        instance = self.get_object()
        if instance:
            return Response(
                {"detail": "Deletion of Base instance is not allowed."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)



class MailUsViewSet(viewsets.ViewSet):
    """
    Get in touch with us via email
    """

    permission_classes = [permissions.AllowAny]

    def create(self, request):
        """
        Create method to send emails and respond appropriately.
        """
        serializer = MailUsSerializer(data=request.data)
        if serializer.is_valid():
            try:
                send_email(serializer.validated_data)
                return Response("Your message has been sent successfully. Thank you!")
            except Exception as e:
                return Response(
                    {"error": f"An error occurred while sending the email: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
