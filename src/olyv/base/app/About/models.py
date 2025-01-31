from django.db import models

from ...widgets.section.models import Section


class About(Section):
    class Meta:
        verbose_name = "(Section) About"
        verbose_name_plural = "(Sections) About"

    about_content = models.TextField(
        help_text="Main content for the About section. You can include your company's story, mission, and values",
    )
    about_image = models.ImageField(
        upload_to="about/",
        blank=True,
        null=True,
        help_text="Visual representation for the About section (high-quality image that represents your brand or team)",
    )
    about_video = models.URLField(
        blank=True,
        null=True,
        help_text="URL to a video about your company (YouTube or Vimeo links recommended)",
    )
    about_alt = models.CharField(
        max_length=255,
        blank=True,
        default="about section media",
        help_text="Descriptive text for accessibility when image/video cannot be displayed",
    )
