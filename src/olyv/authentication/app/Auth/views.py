from django.contrib.auth.models import Group
from rest_framework.viewsets import ReadOnlyModelViewSet

from .serializers import GroupSerializer


class GroupViewSet(ReadOnlyModelViewSet):
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

    def get_queryset(self):
        # Ensure USER, SUPERUSER and STAFF groups exist
        for group_name in ["USER", "STAFF", "SUPERUSER"]:
            Group.objects.get_or_create(name=group_name)
        return super().get_queryset()
