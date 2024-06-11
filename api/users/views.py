from rest_framework import permissions, viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from django.contrib.auth.models import Group
from .models import AdminUser, RegularUser
from .serializers import (
    AdminUserSerializer,
    RegularUserSerializer,
    GroupSerializer,
)


class AdminUserViewSet(viewsets.ModelViewSet):
    """
    Admin Users
    """

    queryset = AdminUser.users.all()
    serializer_class = AdminUserSerializer
    permission_classes = [permissions.IsAdminUser]
    filter_backends = (DjangoFilterBackend, filters.SearchFilter)
    filterset_fields = ("id",)
    search_fields = ("username", "email", "first_name", "last_name")


class RegularUserViewSet(viewsets.ModelViewSet):
    """
    Regular Users
    """

    queryset = RegularUser.users.all()
    serializer_class = RegularUserSerializer
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
