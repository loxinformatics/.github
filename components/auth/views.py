from django.contrib.auth.models import Group, User
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ReadOnlyModelViewSet

from .permissions import IsSelfOrSuperuser
from .serializers import GroupSerializer, UserSerializer


class UserViewSet(ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsSelfOrSuperuser]


class GroupViewSet(ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset(self):
        # Ensure USER, SUPERUSER and STAFF groups exist
        for group_name in ["USER", "STAFF", "SUPERUSER"]:
            Group.objects.get_or_create(name=group_name)
        return super().get_queryset()
