from django.db import models

from ...widgets.section.models import Section


class Contact(Section):
    class Meta:
        verbose_name = "(Section) Contact"
        verbose_name_plural = "(Sections) Contact"

    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1"),
        ("V2", "Version 2"),
        ("V3", "Version 3"),
    ]

    map_URL = models.URLField(
        max_length=500,
        blank=True,
        null=True,
        help_text="Google Maps embed URL (obtain this from Google Maps by clicking 'Share' and selecting 'Embed a map')",
    )
    open_days = models.TextField(
        help_text="Business operating days (e.g., 'Monday to Friday' or 'Monday - Saturday')",
    )
    open_hours = models.TextField(
        help_text="Business operating hours in your local timezone (e.g., '9:00 AM - 6:00 PM EAT')",
    )
