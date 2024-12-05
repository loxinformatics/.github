from django.contrib.auth.models import Group
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter
from rest_framework.viewsets import ReadOnlyModelViewSet

from .models import Administrator, CustomUser, StandardUser
from .serializers import (
    AdministratorSerializer,
    CustomUserSerializer,
    GroupSerializer,
    StandardUserSerializer,
)

# ============================ USER  VIEW ============================


class CustomUserViewSet(ReadOnlyModelViewSet):
    queryset = CustomUser.objects.all().order_by("pk")
    serializer_class = CustomUserSerializer
    filter_backends = (DjangoFilterBackend, SearchFilter)
    filterset_fields = ("id",)
    search_fields = ("username", "email", "first_name", "last_name")


# ============================ ADMINISTRATOR VIEW ============================


class AdministratorViewSet(ReadOnlyModelViewSet):
    queryset = Administrator.objects.all().order_by("pk")
    serializer_class = AdministratorSerializer


# ============================ STANDARD USER VIEW ============================


class StandardUserViewSet(ReadOnlyModelViewSet):
    queryset = StandardUser.objects.all().order_by("pk")
    serializer_class = StandardUserSerializer


# ============================ GROUP VIEW ============================
class GroupViewSet(ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
