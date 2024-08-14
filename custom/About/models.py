from django.db import models
from django.db.models.signals import pre_save
from django.dispatch import receiver
from django_ckeditor_5.fields import CKEditor5Field



# ============================ ABOUT ============================

class About(models.Model):
    class Meta:
        db_table = "components_about"
        verbose_name_plural = "About Content"

    content = CKEditor5Field("Text", config_name="extends")
    image = models.ImageField(upload_to="images/about/", blank=True, null=True)
    video = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "About Content"


@receiver(pre_save, sender=About)
def ensure_about_section_singleton(sender, instance, **kwargs):
    if About.objects.exists() and not About.objects.filter(pk=instance.pk).exists():
        raise ValueError("There can be only one About Content instance.")
