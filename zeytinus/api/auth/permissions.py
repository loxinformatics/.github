from rest_framework.permissions import BasePermission


class IsSelfOrSuperuser(BasePermission):
    """
    Custom permission to only allow users to view/edit their own details,
    but allow superusers to view the list of all users.
    """

    def has_permission(self, request, view):
        # Allow superusers access to the list view
        if view.action == "list" and request.user.is_superuser:
            return True
        # Deny access to the list view for non-superusers
        if view.action == "list":
            return False
        return True  # Allow access for detail views

    def has_object_permission(self, request, view, obj):
        # Allow superusers access to any user's details
        if request.user.is_superuser:
            return True
        # Allow access only to the user’s own object
        return obj.id == request.user.id
