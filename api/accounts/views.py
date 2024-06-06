from rest_framework import permissions, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import Group
from .models import AdminAccount, RegularAccount
from .serializers import (
    AdminAccountSerializer,
    RegularAccountSerializer,
    GroupSerializer,
)


class AdminAccountViewSet(viewsets.ModelViewSet):
    """
    Admin Users
    """

    queryset = AdminAccount.users.all()
    serializer_class = AdminAccountSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ("id",)
    search_fields = ("username", "email", "first_name", "last_name")


class RegularAccountViewSet(viewsets.ModelViewSet):
    """
    Regular Users
    """

    queryset = RegularAccount.users.all()
    serializer_class = RegularAccountSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ("id",)
    search_fields = ("username", "email", "first_name", "last_name")


class GroupViewSet(viewsets.ModelViewSet):
    """
    Groups
    """

    queryset = Group.objects.all().order_by("name")
    serializer_class = GroupSerializer
    permission_classes = [permissions.IsAdminUser]
