from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Contact
from .serializers import ContactSerializer


class ContactViewSet(ReadOnlyModelViewSet):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
