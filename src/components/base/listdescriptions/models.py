from django.db import models

from ..widgets.section.models import Section


class ItemDescription(models.Model):
    image = models.ImageField(upload_to="item_descriptions/", blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    list_descriptions = models.ForeignKey(
        "ListDescriptions", on_delete=models.CASCADE, related_name="items"
    )

    def __str__(self):
        return self.title


class ListDescriptions(Section):
    class Meta:
        verbose_name = "(Section) List Descriptions"
        verbose_name_plural = "(Sections) List Descriptions"

    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1 - Title, Icon & Description"),
        ("V2", "Version 2 - Title, Icon & Description"),
        ("V3", "Version 3 - Image, Title, Icon & Description"),
    ]
