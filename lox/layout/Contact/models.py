from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

# ============================ CONTACT ============================


class Contact(models.Model):
    class Meta:
        verbose_name_plural = "Contact Information"
        db_table = "components_contact"

    website = models.URLField(blank=True, null=True, help_text="Website")
    primary_phone = models.CharField(max_length=255, help_text="Primary Phone Number")
    secondary_phone = models.CharField(
        max_length=255, blank=True, help_text="Secondary Phone Number"
    )
    primary_email = models.EmailField(max_length=255, help_text="Primary Email")
    secondary_email = models.EmailField(
        max_length=255, blank=True, help_text="Secondary Email"
    )
    city_name = models.CharField(max_length=255, help_text="City Name")
    PO_box = models.CharField(max_length=255, blank=True, help_text="P.O Box")
    street = models.CharField(max_length=255, blank=True, help_text="Street")
    open_hours = models.TextField(help_text="e.g Monday to Friday 8:00am - 5:00pm")
    map = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Get the embedded iframe url from Google Maps",
    )

    def __str__(self):
        return "Contact Information"

    def save(self, *args, **kwargs):
        if not self.pk and self.__class__.objects.exists():
            raise ValueError("There can be only one Contact Information instance.")
        return super().save(*args, **kwargs)


@receiver(pre_save, sender=Contact)
def ensure_Contact_singleton(sender, instance, **kwargs):
    if Contact.objects.exists() and not Contact.objects.filter(pk=instance.pk).exists():
        raise ValueError("There can be only one Contact Information instance.")
