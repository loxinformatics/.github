from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Contact(models.Model):
    """
    Model to store contact information about the organization.
    """

    class Meta:
        verbose_name_plural = "Contact Information"
        db_table = "api_contact"

    primary_phone = models.CharField(
        max_length=255,
        help_text="Enter the primary contact phone number. * (Required)",
    )
    secondary_phone = models.CharField(
        max_length=255,
        help_text="Enter the secondary contact phone number. * (Required)",
    )
    primary_email = models.EmailField(
        help_text="Enter the primary contact email. * (Required)",
    )
    secondary_email = models.EmailField(
        help_text="Enter the secondary contact email.",
        blank=True,
    )
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

    def __str__(self):
        return "Contact details"


@receiver(post_save, sender=Contact)
def ensure_single_instance(sender, instance, created, **kwargs):
    """
    Ensure only one instance of Base exists.
    Deletes any additional instances created.
    """
    # If a new instance is created and there's already more than one instance
    if created and Contact.objects.count() > 1:
        # Delete the newly created instance to ensure only one exists
        instance.delete()
