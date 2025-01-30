from django.core.exceptions import ValidationError
from django.db import models

from .utils import recursive_import


class Base(models.Model):
    class Meta:
        verbose_name = "(App) Base"
        verbose_name_plural = "(App) Base"

    def __str__(self):
        return "(App) Base"

    PRIMARY_COLOR_CHOICES = [
        ("#e84545", "red"),
    ]

    full_name = models.CharField(
        max_length=255,
        blank=True,
        help_text="The complete name of your application as it should appear in official contexts",
    )
    short_name = models.CharField(
        max_length=50,
        blank=True,
        help_text="A shorter version of your app name, suitable for headers and mobile displays",
    )
    motto_description = models.TextField(
        blank=True,
        help_text="A brief tagline or slogan that captures your app's mission or value proposition",
    )
    primary_color = models.CharField(
        max_length=7,
        choices=PRIMARY_COLOR_CHOICES,
        default=PRIMARY_COLOR_CHOICES[0][0],
        help_text="Select the primary theme color for your application from the available options",
    )
    website_URL = models.URLField(
        blank=True,
        help_text="The primary website URL for your application (include https://)",
    )  # ? Should I have this filled automatically? Do consider the metadata base path.

    # Logo
    colored_logo_full_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Full-color version of your main logo (500x500px recommended) for use on light backgrounds",
    )
    colored_logo_mini_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Compact version of your colored logo (500x500px recommended) for mobile and small displays",
    )
    light_logo_full_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Light-colored version of your main logo (500x500px recommended) for use on dark backgrounds",
    )
    light_logo_mini_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Compact light-colored version of your logo (500x500px recommended) for mobile and small displays on dark backgrounds",
    )
    dark_logo_full_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Dark-colored version of your main logo (500x500px recommended) for use on light backgrounds",
    )
    dark_logo_mini_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Compact dark-colored version of your logo (500x500px recommended) for mobile and small displays on light backgrounds",
    )

    # Icons
    favicon_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Browser tab icon (32x32px, .ico format recommended). This appears in browser tabs and bookmarks",
    )
    apple_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="iOS home screen icon (180x180px, .png format). This appears when users add your site to their home screen",
    )
    pwa_192_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="PWA icon (192x192px, .png format). Required for Progressive Web Apps",
    )
    pwa_512_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="PWA icon (512x512px, .png format). Required for Progressive Web Apps",
    )

    # Address
    primary_phone = models.CharField(
        max_length=255,
        help_text="Main contact number including country code (e.g., +1 234 567 8900)",
    )
    secondary_phone = models.CharField(
        max_length=255,
        blank=True,
        help_text="(Optional) Enter the secondary phone number.",
    )
    primary_email = models.EmailField(
        max_length=255,
        help_text="Main contact email address for business inquiries",
    )
    secondary_email = models.EmailField(
        max_length=255,
        blank=True,
        help_text="(Optional) Enter the secondary email address.",
    )
    city_name = models.CharField(
        max_length=255,
        help_text="City where your business is located",
    )
    PO_box = models.CharField(
        max_length=255,
        blank=True,
        help_text="(Optional) Enter the P.O. Box.",
    )
    street_address = models.CharField(
        max_length=255,
        blank=True,
        help_text="(Optional) Enter the street address.",
    )

    # Social Media Links
    SOCIAL_MEDIA_LINKS_VERSION_CHOICES = [
        ("V1", "Version 1"),
        ("V2", "Version 2"),
        ("V3", "Version 3"),
    ]

    social_media_links_version = models.CharField(
        max_length=2,
        choices=SOCIAL_MEDIA_LINKS_VERSION_CHOICES,
        default=SOCIAL_MEDIA_LINKS_VERSION_CHOICES[0][0],  # Default to "V1"
        help_text="Select the version for the Social Media Links section.",
    )
    facebook_URL = models.URLField(
        blank=True,
        help_text="(Optional) Enter the Facebook URL.",
    )
    instagram_URL = models.URLField(
        blank=True,
        help_text="(Optional) Enter the Instagram URL.",
    )
    X_URL = models.URLField(
        blank=True,
        help_text="(Optional) Enter the X (formerly Twitter) URL.",
    )
    linkedin_URL = models.URLField(
        blank=True,
        help_text="(Optional) Enter the LinkedIn URL.",
    )
    spotify_URL = models.URLField(
        blank=True,
        help_text="(Optional) Enter the Spotify URL.",
    )

    # Social Media sharing images
    og_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Open Graph image (1200x630px recommended). This appears when sharing on social media",
    )
    X_image = models.ImageField(
        upload_to="metadata/",
        blank=True,
        null=True,
        help_text="Twitter Card image (1200x600px recommended). This appears when sharing on Twitter",
    )

    def clean(self):
        if Base.objects.exists() and not self.pk:
            raise ValidationError("There can be only one '(App) Base' instance.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)


class Navigation(models.Model):
    """Base navigation component settings"""

    NAV_TYPES = [
        ("header", "Header Navigation"),
        ("footer", "Footer Navigation"),
        ("sidebar", "Sidebar Navigation"),
    ]

    nav_type = models.CharField(
        max_length=10, choices=NAV_TYPES, help_text="Type of navigation component"
    )

    class Meta:
        abstract = True


class NavigationItem(Navigation):
    """Individual navigation item"""

    section_type = models.CharField(
        max_length=20,
        choices=[
            ("header", "Header Section"),
            ("footer", "Footer Section"),
            ("sidebar", "Sidebar Section"),
        ],
        help_text="Section type this navigation item belongs to",
    )
    header_section = models.ForeignKey(
        "HeaderHeroSection",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="navigation_items",
    )
    footer_section = models.ForeignKey(
        "FooterBottombarSection",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="navigation_items",
    )
    sidebar_section = models.ForeignKey(
        "SidebarSection",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="navigation_items",
    )
    text = models.CharField(
        max_length=255, help_text="Display text for the navigation item"
    )
    icon = models.CharField(
        max_length=255,
        blank=True,
        help_text="Bootstrap icon class (e.g., 'bi bi-house')",
    )
    href = models.CharField(
        max_length=255, help_text="URL or anchor link for navigation"
    )
    type = models.CharField(
        max_length=50,
        blank=True,
        choices=[
            ("", "Normal Link"),
            ("heading", "Heading"),
            ("dropdown", "Dropdown"),
            ("login/logout", "Login/Logout Button"),
        ],
        help_text="Special type of navigation item",
    )
    parent = models.ForeignKey(
        "self",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="children",
        help_text="Parent item for dropdown menus",
    )
    authorized = models.JSONField(
        null=True,
        blank=True,
        help_text="List of roles that can see this item (e.g., ['STAFF', 'USER'])",
    )
    order = models.IntegerField(
        default=0, help_text="Order of appearance in navigation"
    )

    class Meta:
        ordering = ["order"]

    def __str__(self):
        return f"{self.section_type} - {self.text}"

    def clean(self):
        if self.section_type == "header" and not self.header_section:
            raise ValidationError("Header navigation items must have a header section")
        elif self.section_type == "footer" and not self.footer_section:
            raise ValidationError("Footer navigation items must have a footer section")
        elif self.section_type == "sidebar" and not self.sidebar_section:
            raise ValidationError(
                "Sidebar navigation items must have a sidebar section"
            )

    def save(self, *args, **kwargs):
        # Automatically set section_type based on which section is set
        if self.header_section:
            self.section_type = "header"
        elif self.footer_section:
            self.section_type = "footer"
        elif self.sidebar_section:
            self.section_type = "sidebar"
        super().save(*args, **kwargs)


recursive_import("models.py", "base")
