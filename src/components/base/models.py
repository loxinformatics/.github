from typing import List, Tuple

from django.conf import settings
from django.core.exceptions import ValidationError
from django.db import models


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


class Section(models.Model):
    section_instance = models.CharField(
        max_length=255,
        primary_key=True,
        unique=True,
        help_text="Select the instance",
    )
    section_version = models.CharField(
        max_length=2,
        blank=True,
        help_text="Choose the version (How the section will appear)",
    )

    # title
    TITLE_FIELDS = ["title_version", "title_h2", "title_h3", "title_p"]

    TITLE_VERSION_CHOICES = [
        ("V1", "Version 1"),
        ("V2", "Version 2"),
        ("V3", "Version 3"),
    ]
    title_version = models.CharField(
        max_length=2,
        choices=TITLE_VERSION_CHOICES,
        default=TITLE_VERSION_CHOICES[0][0],
        blank=True,
    )
    title_h2 = models.CharField(max_length=255, blank=True)
    title_h3 = models.CharField(max_length=255, blank=True)
    title_p = models.CharField(max_length=500, blank=True)

    @staticmethod
    def _process_files(
        instances: list, patterns: List[str], file_type: str, component: str
    ) -> None:
        """Helper method to process files and find component instances."""

        for pattern in patterns:
            for file in settings.APP_DIR.rglob(pattern):
                content = file.read_text(encoding="utf-8")
                component_count = content.count(f"<{component}")

                if component_count > 0:
                    parts = file.relative_to(settings.APP_DIR).parts
                    path = "/" + "/".join(parts[:-1]) if len(parts) > 1 else "/"
                    safe_path = path.replace("/", "_").replace("-", "_").strip("_")

                    for i in range(component_count):
                        instance_key = (
                            f"{safe_path}{'_' if safe_path else ''}{file_type}_{i + 1}"
                        )
                        instances.append(
                            (
                                instance_key,
                                f"{component} {i + 1} at {path} ({file_type})",
                            )
                        )

    @classmethod
    def get_instances(cls) -> List[Tuple[str, str]]:
        """
        Get all instances where this section component is used in the Next.js pages.
        Returns a list of tuples containing (instance_key, readable_instance_name).
        """
        instances = []
        page_patterns = ["page.tsx", "page.js", "page.jsx"]
        layout_patterns = ["layout.tsx", "layout.js", "layout.jsx"]

        cls._process_files(instances, page_patterns, "page", cls.__name__)
        cls._process_files(instances, layout_patterns, "layout", cls.__name__)

        return instances or [("", "--- No instances available ---")]

    @staticmethod
    def get_readable_instance(instance_key: str) -> str:
        """
        Convert a section instance key to a human-readable format.
        Args:
            instance_key: The instance key to convert
        Returns:
            str: A human-readable representation of the instance location
        """
        if not instance_key:
            return "--- No instances available ---"

        # Handle numbered instances without path (e.g., "page_1" or "layout_1")
        if "_" in instance_key:
            parts = instance_key.split("_")
            if (
                len(parts) == 2
                and parts[0] in ["page", "layout"]
                and parts[1].isdigit()
            ):
                return f"/ #{parts[1]} ({parts[0]})"

        # Extract the number and file type from the end
        parts = instance_key.rsplit("_", 2)
        if len(parts) >= 2 and parts[-1].isdigit():
            path = parts[0].replace("_", "/")
            file_type = parts[-2]  # Will be either "page" or "layout"
            return f"/{path} #{parts[-1]} ({file_type})"

        return instance_key

    def __str__(self):
        return f"{self._meta.verbose_name.capitalize()} at {self.get_readable_instance(self.section_instance)}"

    class Meta:
        abstract = True


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
            self.section_type = 'header'
        elif self.footer_section:
            self.section_type = 'footer'
        elif self.sidebar_section:
            self.section_type = 'sidebar'
        super().save(*args, **kwargs)


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


class HeaderHeroSection(Section):
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


class AboutSection(Section):
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


class CallToActionSection(Section):
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


class ContactSection(Section):
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


class ListSection(Section):
    class Meta:
        verbose_name = "(Section) List"
        verbose_name_plural = "(Sections) List"

    SECTION_VERSION_CHOICES = [
        ("V1", "Version 1 - Title, Icon & Description"),
        ("V2", "Version 2 - Title, Icon & Description"),
        ("V3", "Version 3 - Image, Title, Icon & Description"),
    ]


class FooterBottombarSection(Section):
    class Meta:
        verbose_name = "(Section) Footer & Bottombar"
        verbose_name_plural = "(Sections) Footer & Bottombar"


class SidebarSection(Section):
    class Meta:
        verbose_name = "(Section) Sidebar"
        verbose_name_plural = "(Sections) Sidebar"
