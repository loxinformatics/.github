from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver

# ============================ SOCIAL LINKS ============================


class SocialLinks(models.Model):
    class Meta:
        verbose_name_plural = "Social Links"
        db_table = "components_sociallinks"

    facebook = models.URLField(blank=True, null=True, help_text="Facebook URL")
    twitter_x = models.URLField(blank=True, null=True, help_text="Twitter X URL")
    instagram = models.URLField(blank=True, null=True, help_text="Instagram URL")
    linkedin = models.URLField(blank=True, null=True, help_text="LinkedIn URL")
    whatsapp = models.URLField(blank=True, null=True, help_text="WhatsApp URL")

    def __str__(self):
        return "Social Links"

    def save(self, *args, **kwargs):
        if not self.pk and self.__class__.objects.exists():
            raise ValueError("There can be only one Social Links instance.")
        return super().save(*args, **kwargs)


@receiver(pre_save, sender=SocialLinks)
def ensure_SocialLinks_singleton(sender, instance, **kwargs):
    if (
        SocialLinks.objects.exists()
        and not SocialLinks.objects.filter(pk=instance.pk).exists()
    ):
        raise ValueError("There can be only one Social Links instance.")
