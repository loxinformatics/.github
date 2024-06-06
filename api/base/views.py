from rest_framework import permissions, viewsets, status
from rest_framework.response import Response
from .models import Base
from .serializers import BaseSerializer


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
