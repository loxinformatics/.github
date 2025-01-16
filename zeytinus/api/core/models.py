from django.db import models

from ..base.models import Section


class HeaderHeroSection(Section):
    class Meta:
        verbose_name = "Header & Hero section"
        verbose_name_plural = "Header & Hero sections"

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
    header_nav = models.BooleanField(
        verbose_name="include Navigation",
        default=True,
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


class AboutSection(Section):
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


class CallToActionSection(Section):
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


class ContactSection(Section):
    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1"),
        ("V2", "Version 2"),
        ("V3", "Version 3"),
    ]

    map = models.BooleanField(
        default=False,
        verbose_name="Include map",
        help_text="Note that the map URL must be configured in 'App Contact Information' settings.",
    )


class ListSection(Section):
    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1 - Title, Icon & Description"),
        ("V2", "Version 2 - Title, Icon & Description"),
        ("V3", "Version 3 - Image, Title, Icon & Description"),
    ]


class ItemDescription(models.Model):
    image = models.ImageField(upload_to="item_descriptions/", blank=True, null=True)
    icon = models.CharField(max_length=255, blank=True)
    title = models.CharField(max_length=255, blank=True)
    description = models.TextField(blank=True)
    list_description = models.ForeignKey(
        ListSection, on_delete=models.CASCADE, related_name="items"
    )

    def __str__(self):
        return self.title
