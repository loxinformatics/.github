from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager, Group
from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver


class User(AbstractUser):
    """
    Custom user model that extends AbstractUser.

    This model includes all the default fields provided by AbstractUser, such as:
    - username
    - first_name
    - last_name
    - email
    - is_staff
    - is_active
    - date_joined

    Default fields can be overridden to add customization
    e.g email has been overridden, removing 'blank=True' and adding 'unique=True'

    Additional fields can be added below to extend the functionality.
    e.g role and image fields
    """

    class Meta:
        db_table = "app_users"

    class Role(models.TextChoices):
        """
        Define user roles.
        """

        REGULAR = "REGULAR", "Regular"
        ADMIN = "ADMIN", "Admin"

    base_role = Role.REGULAR  # default role

    role = models.CharField(
        max_length=50,
        choices=Role.choices,
        help_text="Role of the user.",
    )
    image = models.ImageField(
        upload_to="users/",
        help_text="Upload an image that is 600x600",
        blank=True,
        default="defaults/default_profile.jpg",
    )
    email = models.EmailField(unique=True)

    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    def save(self, *args, **kwargs):
        """
        Override the save method to set 'role' and 'is_staff'
        """

        self.role = self.Role.ADMIN if self.is_superuser else self.base_role
        self.is_staff = True if self.role == self.Role.ADMIN else False
        super().save(*args, **kwargs)

    def __str__(self):
        """
        Return the full name of the user.
        """
        return f"{self.first_name} {self.last_name}"


@receiver(post_migrate)
def create_groups(sender, **kwargs):
    """
    Signal receiver that creates the admin and regular user groups
    after migrations are applied.
    """
    if sender.name == "users":
        # Create the groups if they don't exist
        admin_group, _ = Group.objects.get_or_create(name=User.Role.ADMIN)
        user_group, _ = Group.objects.get_or_create(name=User.Role.REGULAR)


@receiver(post_save, sender=User)
def add_to_admin_or_user_group(sender, instance, created, **kwargs):
    """
    Signal receiver that adds a newly created Account instance to the appropriate group
    based on its role.
    - 'User.objects.create_user()': the role will be REGULAR
    - 'createsuperuser': the role will be ADMIN
    """
    if created and instance.role == User.Role.ADMIN:
        admin_group, _ = Group.objects.get_or_create(name=User.Role.ADMIN)
        if not admin_group.user_set.filter(pk=instance.pk).exists():
            instance.groups.add(admin_group)
    elif created and instance.role == User.Role.REGULAR:
        user_group, _ = Group.objects.get_or_create(name=User.Role.REGULAR)
        if not user_group.user_set.filter(pk=instance.pk).exists():
            instance.groups.add(user_group)


class AdminUserManager(UserManager):
    """
    Custom manager for AdminAccount to return only admin users.
    """

    def get_queryset(self):
        return super().get_queryset().filter(role=User.Role.ADMIN)


class AdminUser(User):
    """
    Proxy model for accounts with the admin role.
    """

    users = AdminUserManager()
    base_role = User.Role.ADMIN

    class Meta:
        proxy = True
        verbose_name = "Admin Account"
        verbose_name_plural = "Admin Accounts"


@receiver(post_save, sender=AdminUser)
def add_to_admin_group(sender, instance, created, **kwargs):
    """
    Signal receiver that adds a newly created Admin instance to the admin group.
    - 'AdminUser.objects.create_user()'
    """
    if created and instance.role == User.Role.ADMIN:
        admin_group, _ = Group.objects.get_or_create(name=User.Role.ADMIN)
        if not admin_group.user_set.filter(pk=instance.pk).exists():
            instance.groups.add(admin_group)


class RegularUserManager(UserManager):
    """
    Custom manager for RegularAccount to return only regular users.
    """

    def get_queryset(self):
        return super().get_queryset().filter(role=User.Role.REGULAR)


class RegularUser(User):
    """
    Proxy model for accounts with the regular user role.
    """

    users = RegularUserManager()
    base_role = User.Role.REGULAR

    class Meta:
        proxy = True
        verbose_name = "Regular Account"
        verbose_name_plural = "Regular Accounts"


@receiver(post_save, sender=RegularUser)
def add_to_user_group(sender, instance, created, **kwargs):
    """
    Signal receiver that adds a newly created Regular instance to the regular user group.
    - 'RegularUser.objects.create_user()'
    """
    if created and instance.role == User.Role.REGULAR:
        user_group, _ = Group.objects.get_or_create(name=User.Role.REGULAR)
        if not user_group.user_set.filter(pk=instance.pk).exists():
            instance.groups.add(user_group)
