from rest_framework import permissions, viewsets, filters, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response

from django.contrib.auth.models import Group
from .models import Root, User
from .serializers import (
    RootSerializer,
    UserSerializer,
    GroupSerializer,
    MailSerializer,
)


# ****************************** root ********************************


class RootViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows basic info to be viewed.
    """

    queryset = Root.objects.all()
    serializer_class = RootSerializer


# ****************************** users & groups ********************************


class UsersViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ("id",)
    search_fields = ("username", "email", "first_name", "last_name")


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """

    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAuthenticated]


# ****************************** mail us ********************************


class MailUsViewSet(viewsets.ViewSet):
    """
    A simple ViewSet for handling contact form submissions via email.
    """

    def create(self, request):
        serializer = MailSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"message": "Your message has been sent. Thank you!"})
        else:
            return Response(
                {"errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST
            )
