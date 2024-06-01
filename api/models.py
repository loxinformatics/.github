from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    BaseUserManager,
    PermissionsMixin,
)
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.utils import timezone


# ****************************** root ********************************


class Root(models.Model):

    class Meta:
        verbose_name_plural = "Base Information"

    # ======= Info =======
    name = models.CharField(
        max_length=255,
        help_text="Enter the full name. * (Required)",
    )
    short_name = models.CharField(
        max_length=255,
        help_text="Enter the short name. * (Required)",
    )
    description = models.TextField(help_text="Enter the description. * (Required)")

    # ======= Contact =======
    primary_email = models.EmailField(
        help_text="Enter the primary contact email. * (Required)"
    )
    secondary_email = models.EmailField(
        help_text="Enter the secondary contact email. * (Required)"
    )
    primary_phone = models.CharField(
        max_length=255, help_text="Enter the primary contact phone number. * (Required)"
    )
    secondary_phone = models.CharField(
        max_length=255,
        help_text="Enter the secondary contact phone number. * (Required)",
    )

    # ======= Addressing =======
    building = models.CharField(
        max_length=255,
        help_text="Enter the location building",
        blank=True,
    )
    street = models.CharField(
        max_length=255,
        help_text="Enter the location street",
        blank=True,
    )
    PO_box = models.CharField(
        max_length=255,
        help_text="Enter the P.O Box",
        blank=True,
    )
    city_name = models.CharField(
        max_length=255,
        help_text="Enter the city name",
        blank=True,
    )
    zip_code = models.CharField(
        max_length=255,
        help_text="Enter the zip code",
        blank=True,
    )
    open_days = models.CharField(
        max_length=255,
        help_text="e.g Monday - Friday",
        blank=True,
    )
    open_hours = models.CharField(
        max_length=255,
        help_text="e.g 8:15AM - 05:00PM",
        blank=True,
    )

    # ======= Social =======
    facebook = models.URLField(
        max_length=255,
        help_text="Enter the facebook account url",
        blank=True,
    )
    twitter_x = models.URLField(
        max_length=255,
        help_text="Enter the X account url",
        blank=True,
    )
    instagram = models.URLField(
        max_length=255,
        help_text="Enter the Instagram account url",
        blank=True,
    )
    linkedin = models.URLField(
        max_length=255,
        help_text="Enter the Linkedin account url",
        blank=True,
    )
    whatsapp = models.URLField(
        max_length=255,
        help_text="Enter the Whatsapp url in the format 'https://wa.me/254700000000'. Replace with appropriate phone number",
        blank=True,
    )

    @staticmethod
    def get_or_create_singleton():
        """
        Ensure only one record exists
        """

        obj, created = Root.objects.get_or_create(pk=1)
        return obj

    def __str__(self):
        return self.name


# ****************************** users & groups ********************************


class UserManager(BaseUserManager):
    def create_user(self, username, password=None, **extra_fields):
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")

        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")

        return self.create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):

    class Role(models.TextChoices):
        USER = "USER", "User"

        # create more distinct type of users like this

        # CLIENT = "CLIENT", "Client"

        # check the commented out proxy Client model and manager classes below

    base_role = Role.USER

    username_validator = UnicodeUsernameValidator()

    role = models.CharField(max_length=50, choices=Role.choices, blank=True)
    image = models.ImageField(
        upload_to="students/",
        help_text="Upload an image that is 600x600",
        blank=True,
        default="defaults/default_profile.jpg",
    )

    username = models.CharField(
        max_length=150,
        unique=True,
        help_text=(
            "Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only."
        ),
        validators=[username_validator],
        error_messages={
            "unique": ("A user with that username already exists."),
        },
    )
    email = models.EmailField(max_length=255, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    date_joined = models.DateTimeField(default=timezone.now)
    last_login = models.DateTimeField(blank=True, null=True)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["email", "first_name", "last_name"]

    objects = UserManager()

    def save(self, *args, **kwargs):
        self.role = self.base_role
        return super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


# class ClientManager(BaseUserManager):
#     def get_queryset(self, *args, **kwargs):
#         queryset = super().get_queryset(*args, **kwargs)
#         return queryset.filter(role=User.Role.CLIENT)


# class Client(User):
#     class Meta:
#         proxy = True

#     base_role = User.Role.CLIENT
#     clients = ClientManager()
