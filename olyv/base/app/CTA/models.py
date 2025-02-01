from django.db import models

from ...widgets.layout.Section.models import Section


class CTA(Section):
    class Meta:
        verbose_name = "(Section) Call To Action"
        verbose_name_plural = "(Sections) Call To Action"

    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1"),
        ("V2", "Version 2"),
    ]

    cta_heading = models.TextField(
        help_text="Compelling headline for your call-to-action section. HTML tags allowed for emphasis (e.g., em)",
    )
    cta_paragraph = models.TextField(
        help_text="Persuasive text explaining the value proposition or why users should take action",
    )
    cta_button_text = models.CharField(
        max_length=250,
        help_text="Action-oriented button text that encourages clicks (e.g., 'Get Started', 'Learn More')",
    )
    cta_button_href = models.CharField(
        max_length=500,
        help_text="Destination URL for the button. Use absolute URLs for external links or '/' prefix for internal pages",
    )
    cta_button_icon = models.CharField(
        max_length=250,
        blank=True,
        help_text="Bootstrap icon class to add visual emphasis to the button (e.g., 'bi bi-arrow-right'). Find icons at icons.getbootstrap.com",
    )
    # cta_button_rounded = models.BooleanField(
    #     default=False,
    #     help_text="Check this box to make the CTA button rounded.",
    # )
    # cta_button_outline = models.BooleanField( # TODO: Have this to be either false true or primary or sth like that
    #     default=False,
    #     help_text="Check this box to make the CTA button outlined.",
    # )
    cta_image = models.ImageField(
        upload_to="cta/",
        blank=True,
        null=True,
        help_text="(Optional) Upload an image for the CTA section.",
    )
