from django.contrib.auth.models import Group
from django.contrib.auth.signals import user_logged_in
from django.db.models.signals import post_migrate, post_save
from django.dispatch import receiver
from django.utils import timezone
from .models import Base, User


# ****************************** base ********************************


@receiver(post_save, sender=Base)
def ensure_single_company(sender, instance, created, **kwargs):
    """
    Signal receiver to ensure only one record exists
    """

    if created and Base.objects.count() > 1:
        instance.delete()


# ****************************** users & groups ********************************


@receiver(post_migrate)
def create_groups(sender, **kwargs):
    if sender.label == "api":
        # Create the groups if they don't exist
        Group.objects.get_or_create(name=User.Role.USER)


@receiver(post_save, sender=User)
def add_to_user_group(sender, instance, created, **kwargs):
    if created and instance.role == User.Role.USER:
        user_group, _ = Group.objects.get_or_create(name=User.Role.USER)
        instance.groups.add(user_group)


@receiver(user_logged_in, sender=User)
def update_last_login(sender, request, user, **kwargs):
    user.last_login = timezone.now()
    user.save(update_fields=["last_login"])
