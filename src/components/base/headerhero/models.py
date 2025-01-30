from django.db import models

from ..widgets.section.models import Section


class HeaderHero(Section):
    class Meta:
        verbose_name = "(Section) Header & Hero"
        verbose_name_plural = "(Sections) Header & Hero"

    # header
    HEADER_BACKGROUND_CHOICES = [
        ("body", "Body"),
        ("dark", "Dark"),
    ]
    header_background = models.CharField(
        max_length=5,
        choices=HEADER_BACKGROUND_CHOICES,
        default=HEADER_BACKGROUND_CHOICES[0][0],
    )
    LOGO_VERSION_CHOICES = [
        ("logo_image", "Version 1 - Logo Image"),
        ("app_full_name", "Version 2 - Application Full Name"),
        ("app_short_name", "Version 3 - Application Short Name"),
    ]
    logo_version = models.CharField(
        max_length=14,
        choices=LOGO_VERSION_CHOICES,
        default=LOGO_VERSION_CHOICES[0][0],
        help_text="Select the header logo type. Note that logo images and app names must be configured in 'App Metadata' settings.",
    )
    theme_toggler = models.BooleanField(
        verbose_name="include Theme Toggler Button",
        default=True,
    )

    # Hero
    hero_heading = models.TextField(
        blank=True,
        help_text="Main headline text that captures attention and communicates your primary message",
    )
    hero_sub_heading = models.TextField(
        blank=True,
        help_text="Supporting text that provides additional context to your main headline",
    )
    hero_paragraph = models.TextField(
        blank=True,
        help_text="Detailed description or call-to-action text that expands on your headline message",
    )
    hero_image = models.ImageField(
        upload_to=str("headerhero/"),
        blank=True,
        null=True,
        help_text="(Optional) Upload an image for the hero section.",
    )
    hero_button_text = models.CharField(
        max_length=50,
        blank=True,
        help_text="Text to display on the hero section's call-to-action button (keep it short and actionable)",
    )
    hero_button_href = models.CharField(
        max_length=100,
        blank=True,
        help_text="URL or path where the hero button should link to (use relative paths starting with '/' for internal links)",
    )
