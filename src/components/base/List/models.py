from django.db import models

from ..management.models import Section


class ListItem(models.Model):
    image = models.ImageField(upload_to="item_descriptions/", blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    list_section = models.ForeignKey(
        "ListSection", on_delete=models.CASCADE, related_name="items"
    )

    def __str__(self):
        return self.title


class ListSection(Section):
    class Meta:
        verbose_name = "(Section) List"
        verbose_name_plural = "(Sections) List"

    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1 - Title, Icon & Description"),
        ("V2", "Version 2 - Title, Icon & Description"),
        ("V3", "Version 3 - Image, Title, Icon & Description"),
    ]
