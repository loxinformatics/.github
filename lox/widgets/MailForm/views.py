from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import MailSerializer
from .utils import send_mail


class MailAPIView(APIView):
    """
    Get in touch with us via email
    """

    def post(self, request):
        """
        Create method to send emails and respond appropriately.
        """
        serializer = MailSerializer(data=request.data)
        if serializer.is_valid():
            try:
                send_mail(serializer.validated_data)
                return Response(
                    {"success": "Your message has been sent successfully. Thank you!"}
                )
            except Exception as e:
                return Response(
                    {"error": f"An error occurred while sending the email: {str(e)}"},
                    status=status.HTTP_500_INTERNAL_SERVER_ERROR,
                )
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
