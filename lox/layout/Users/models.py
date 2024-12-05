from django.contrib.auth.models import AbstractUser, Group, UserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver

# ============================ USER ============================


class CustomUser(AbstractUser):
    class Meta:
        db_table = "auth_users"
        verbose_name_plural = "Users"

    class Role(models.TextChoices):
        ADMINISTRATOR = "administrator", "Administrator"
        STANDARD_USER = "standard_user", "Standard User"

    base_role = None
    role = models.CharField(max_length=255, blank=True)
    image = models.ImageField(
        upload_to="images/users/",
        help_text="Upload an image that is 600x600",
        blank=True,
        null=True,
        verbose_name="Profile image",
    )
    description = models.TextField(blank=True)

    # ? Is the email field unique by default
    email = models.EmailField(unique=True)  # made email to be unique

    def save(self, *args, **kwargs):
        if self.base_role:
            self.role = self.base_role
            self.is_staff = self.role != self.Role.STANDARD_USER

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# ============================ ADMINISTRATOR ============================


class AdministratorManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role=CustomUser.Role.ADMINISTRATOR)


class Administrator(CustomUser):
    class Meta:
        proxy = True

    objects = AdministratorManager()
    base_role = CustomUser.Role.ADMINISTRATOR


@receiver(post_save, sender=Administrator)
def create_administrator_group(sender, instance, created, **kwargs):
    if created:
        group, group_created = Group.objects.get_or_create(
            name=CustomUser.Role.ADMINISTRATOR
        )
        instance.groups.add(group)


# ============================ STANDARD ============================


class StandardManager(UserManager):
    def get_queryset(self):
        return super().get_queryset().filter(role=CustomUser.Role.STANDARD_USER)


class StandardUser(CustomUser):
    class Meta:
        proxy = True

    objects = StandardManager()
    base_role = CustomUser.Role.STANDARD_USER


@receiver(post_save, sender=StandardUser)
def create_standard_group(sender, instance, created, **kwargs):
    if created:
        group, group_created = Group.objects.get_or_create(name=CustomUser.Role.STANDARD_USER)
        instance.groups.add(group)
