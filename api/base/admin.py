from django.contrib import admin
from .models import Base


@admin.register(Base)
class BaseAdmin(admin.ModelAdmin):
    def has_add_permission(self, request, obj=None):
        """
        Check if adding a new instance of Base is allowed.
        Only allow addition if no instances of Base exist.
        """
        return not Base.objects.exists()

    def has_delete_permission(self, request, obj=None):
        """
        Check if deleting an instance of Base is allowed.
        Disallow deletion if the object exists; only allow editing.
        """
        return not obj
