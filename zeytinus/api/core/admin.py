from django.contrib import admin

from ..base.admin import SectionAdmin
from .forms import (
    AboutAddForm,
    AboutChangeForm,
    ContactAddForm,
    ContactChangeForm,
    CTAAddForm,
    CTAChangeForm,
    HeaderHeroAddForm,
    HeaderHeroChangeForm,
    ListDescriptionsAddForm,
    ListDescriptionsChangeForm,
)
from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ItemDescription,
    ListSection,
)


@admin.register(HeaderHeroSection)
class HeaderHeroAdmin(SectionAdmin):
    add_form = HeaderHeroAddForm
    form = HeaderHeroChangeForm
    model = HeaderHeroSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        (
            "HEADER SETTINGS",
            {
                "fields": [
                    "header_background",
                    "logo_version",
                    "header_nav",
                    "theme_toggler",
                ]
            },
        ),
        (
            "HERO CONTENT",
            {
                "fields": [
                    "hero_heading",
                    "hero_sub_heading",
                    "hero_paragraph",
                    "hero_image",
                    "hero_button_text",
                    "hero_button_href",
                ]
            },
        ),
    ]


@admin.register(AboutSection)
class AboutAdmin(SectionAdmin):
    add_form = AboutAddForm
    form = AboutChangeForm
    model = AboutSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
        (
            "CONTENT",
            {"fields": ["about_content", "about_image", "about_video", "about_alt"]},
        ),
    ]


@admin.register(CallToActionSection)
class CTAAdmin(SectionAdmin):
    add_form = CTAAddForm
    form = CTAChangeForm
    model = CallToActionSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        (
            "CONTENT",
            {
                "fields": [
                    "cta_heading",
                    "cta_paragraph",
                    "cta_button_text",
                    "cta_button_href",
                    "cta_button_icon",
                    "cta_image",
                ]
            },
        ),
    ]


@admin.register(ContactSection)
class ContactAdmin(SectionAdmin):
    add_form = ContactAddForm
    form = ContactChangeForm
    model = ContactSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
        ("CONTACT SETTINGS", {"fields": ["map"]}),
    ]


class ItemDescriptionInline(admin.StackedInline):
    model = ItemDescription
    extra = 1


@admin.register(ListSection)
class ListDescriptionsAdmin(SectionAdmin):
    add_form = ListDescriptionsAddForm
    form = ListDescriptionsChangeForm
    model = ListSection
    inlines = [ItemDescriptionInline]

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
    ]
