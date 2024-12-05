from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Administrator, CustomUser, StandardUser


class CustomUserAdmin(UserAdmin):
    fieldsets = (
        (
            "",
            {
                "fields": (
                    "username",
                    "password",
                )
            },
        ),
        (
            "Personal Info",
            {
                "fields": (
                    "image",  # included the image field
                    "first_name",
                    "last_name",
                    "email",
                    "description",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "role",
                    "is_staff",
                    "is_active",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                )
            },
        ),
        (
            "Important Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )
    list_display = ["username", "email", "first_name", "last_name"]
    list_display_links = ["username"]
    list_editable = ["email", "first_name", "last_name"]
    list_filter = ()  # we're using proxy tables, so there really isn't a need to filter by role

    def get_fieldsets(self, request, obj=None):
        fieldsets = super().get_fieldsets(request, obj)

        if request.user.is_superuser:
            return fieldsets

        # Remove the fields you don't want to show for non-superusers
        fieldsets = list(fieldsets)
        for name, section in fieldsets:
            section["fields"] = tuple(
                field
                for field in section["fields"]
                if field
                not in [
                    "role",
                    "is_superuser",
                    "groups",
                    "user_permissions",
                    "description",
                ]  # add the fields here
            )

        return fieldsets


admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Administrator, CustomUserAdmin)
admin.site.register(StandardUser, CustomUserAdmin)
