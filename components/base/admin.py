from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

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
    Base,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ItemDescription,
    ListSection,
)


class SingletonAdmin(admin.ModelAdmin):
    """
    Base admin class to enforce singleton behavior in the Django admin interface.
    """

    def changelist_view(self, request, extra_context=None):
        opts = self.model._meta
        if self.model.objects.exists():
            # Redirect to the change view for the singleton instance
            singleton_instance = self.model.objects.first()
            return HttpResponseRedirect(
                reverse(
                    "admin:%s_%s_change" % (opts.app_label, opts.model_name),
                    args=[singleton_instance.pk],
                )
            )
        else:
            # Redirect to the add view if no instance exists
            return HttpResponseRedirect(
                reverse("admin:%s_%s_add" % (opts.app_label, opts.model_name))
            )

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

    def changeform_view(self, request, object_id=None, form_url="", extra_context=None):
        extra_context = extra_context or {}
        # Hide 'save and add another' button
        extra_context["show_save_and_add_another"] = False
        return super(SingletonAdmin, self).changeform_view(
            request, object_id, form_url, extra_context=extra_context
        )


@admin.register(Base)
class BaseAdmin(SingletonAdmin):
    fieldsets = (
        (
            "Base",
            {
                "fields": (
                    "full_name",
                    "short_name",
                    "motto_description",
                    "primary_color",
                    "website_URL",
                )
            },
        ),
        (
            "Logo",
            {
                "fields": (
                    "colored_logo_full_image",
                    "colored_logo_mini_image",
                    "light_logo_full_image",
                    "light_logo_mini_image",
                    "dark_logo_full_image",
                    "dark_logo_mini_image",
                ),
            },
        ),
        (
            "Icons",
            {
                "fields": (
                    "favicon_image",
                    "apple_image",
                    "pwa_192_image",
                    "pwa_512_image",
                ),
            },
        ),
        (
            "Addressing",
            {
                "fields": (
                    "primary_phone",
                    "secondary_phone",
                    "primary_email",
                    "secondary_email",
                    "city_name",
                    "PO_box",
                    "street_address",
                )
            },
        ),
        (
            "Social Media Links",
            {
                "fields": (
                    "social_media_links_version",
                    "facebook_URL",
                    "instagram_URL",
                    "X_URL",
                    "linkedin_URL",
                    "spotify_URL",
                ),
            },
        ),
        (
            "Social Media Sharing Images",
            {
                "fields": (
                    "og_image",
                    "X_image",
                ),
            },
        ),
    )


class SectionAdmin(admin.ModelAdmin):
    """Base admin class for section models with customized form handling."""

    def get_form(self, request, obj=None, **kwargs):
        if obj is None:
            return self.add_form
        return super().get_form(request, obj, **kwargs)


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
        ("CONTENT", {"fields": ["map_URL", "open_days", "open_hours"]}),
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
