from django.core.exceptions import ValidationError
from django.db import models


class Navigation(models.Model):
    """Base navigation component settings"""

    NAV_TYPES = [
        ("header", "Header Navigation"),
        ("footer", "Footer Navigation"),
        ("aside", "Aside Navigation"),
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
            ("aside", "Aside Section"),
        ],
        help_text="Section type this navigation item belongs to",
    )
    header_section = models.ForeignKey(
        "HeaderHero",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="navigation_items",
    )
    footer_section = models.ForeignKey(
        "FooterBottombar",
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="navigation_items",
    )
    aside_section = models.ForeignKey(
        "Aside",
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
        elif self.section_type == "aside" and not self.aside_section:
            raise ValidationError(
                "Aside navigation items must have an aside section"
            )

    def save(self, *args, **kwargs):
        # Automatically set section_type based on which section is set
        if self.header_section:
            self.section_type = "header"
        elif self.footer_section:
            self.section_type = "footer"
        elif self.aside_section:
            self.section_type = "aside"
        super().save(*args, **kwargs)
