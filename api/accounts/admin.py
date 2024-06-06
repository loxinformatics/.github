from django.contrib import admin
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import Group
from .models import Account, AdminAccount, RegularAccount
from .forms import AccountChangeForm


class AccountAdmin(admin.ModelAdmin):
    """
    Base admin class for account-related models.
    Excludes 'is_superuser', 'role' and 'groups' and 'user_permissions' field.
    """

    form = AccountChangeForm

    fieldsets = (
        (
            "Authentication",
            {
                "fields": (
                    "username",
                    "email",
                    "password",
                )
            },
        ),
        (
            "Profile",
            {
                "fields": (
                    "first_name",
                    "last_name",
                    "image",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                ),
            },
        ),
        (
            "Important dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )

    list_display = [Account.USERNAME_FIELD] + Account.REQUIRED_FIELDS
    list_display_links = [Account.USERNAME_FIELD]
    list_editable = Account.REQUIRED_FIELDS

    def save_model(self, request, obj, form, change):
        """
        Override save_model to hash the password before saving.
        """
        if "password" in form.changed_data:  # Check if 'password' field has changed
            obj.password = make_password(
                form.cleaned_data["password"]
            )  # Hash the new password
        super().save_model(request, obj, form, change)

    def get_changeform_initial_data(self, request):
        """
        Set initial data, ensuring the user is included in the appropriate group when saved via the admin panel.
        """
        initial = super().get_changeform_initial_data(request)
        initial["groups"] = self.get_group_filter()
        return initial

    def get_group_filter(self):
        """
        Method to filter groups based on the user's role.
        Should be overridden in subclasses.
        """
        raise NotImplementedError(
            "Subclasses of BaseUserAdmin must implement get_group_filter()"
        )


@admin.register(AdminAccount)
class AdminAccountAdmin(AccountAdmin):
    """
    Admin class for managing Admin users.
    """

    def get_group_filter(self):
        """
        Filter groups based on the user's role (admin).
        """
        return Group.objects.filter(name=Account.Role.ADMIN)


@admin.register(RegularAccount)
class RegularAccountAdmin(AccountAdmin):
    """
    Admin class for managing regular users.
    """

    def get_group_filter(self):
        """
        Filter groups based on the user's role (user).
        """
        return Group.objects.filter(name=Account.Role.REGULAR)
