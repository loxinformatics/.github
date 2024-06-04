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
    Company Basic Information.
    """

    queryset = Root.objects.all()
    serializer_class = RootSerializer
    permission_classes = [permissions.DjangoModelPermissionsOrAnonReadOnly]

    def create(self, request, *args, **kwargs):
        if Root.objects.exists():
            return Response(
                {"detail": "Only one instance of Root is allowed."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().create(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance:
            return Response(
                {"detail": "Deletion of Root instance is not allowed."},
                status=status.HTTP_403_FORBIDDEN,
            )
        return super().destroy(request, *args, **kwargs)


# ****************************** users & groups ********************************


class UsersViewSet(viewsets.ModelViewSet):
    """
    Users
    """

    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ("id",)
    search_fields = ("username", "email", "first_name", "last_name")


class GroupViewSet(viewsets.ModelViewSet):
    """
    User Groups
    """

    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]


# ****************************** mail us ********************************


class MailUsViewSet(viewsets.ViewSet):
    """
    Get in touch with us via email.
    """

    permission_classes = [permissions.AllowAny]

    def create(self, request):
        serializer = MailSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            return Response("Your message has been sent. Thank you!")
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
