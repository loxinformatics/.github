from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Base(models.Model):
    """
    Model to store base information about the organization.
    """

    class Meta:
        verbose_name_plural = "Base Information"
        db_table = "api_base"

    name = models.CharField(
        max_length=255,
        help_text="Enter the full name. * (Required)",
    )
    short_name = models.CharField(
        max_length=255,
        help_text="Enter the short name.",
        blank=True,
    )
    motto = models.CharField(
        max_length=255,
        help_text="Enter the motto.",
        blank=True,
    )
    description = models.TextField(
        help_text="Enter the description.",
        blank=True,
    )
    logo = models.ImageField(
        upload_to="base/",
        help_text="Pick a logo preferably of size 500x500",
        blank=True,
        null=True,
    )
    website = models.URLField(
        max_length=255,
        help_text="Enter the website url",
        blank=True,
    )

    def __str__(self):
        return self.name


@receiver(post_save, sender=Base)
def ensure_single_instance(sender, instance, created, **kwargs):
    """
    Ensure only one instance of Base exists.
    Deletes any additional instances created.
    """
    # If a new instance is created and there's already more than one instance
    if created and Base.objects.count() > 1:
        # Delete the newly created instance to ensure only one exists
        instance.delete()
