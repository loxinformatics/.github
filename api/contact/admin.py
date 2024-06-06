from django.contrib import admin
from .models import Contact


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        """
        Check if adding a new instance of Contact is allowed.
        Only allow addition if no instances of Contact exist.
        """
        return not Contact.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """
        Check if deleting an instance of Contact is allowed.
        Disallow deletion if the object exists; only allow editing.
        """
        return not obj
