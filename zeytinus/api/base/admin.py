from decouple import config
from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import ContactInfo, Metadata


def admin_site_url(path: str = ""):
    protocol = config("NEXT_PUBLIC_WEB_PROTOCOL", default="http")
    host = str(config("NEXT_PUBLIC_WEB_HOST", default="localhost")).strip("/")
    port = config("NEXT_PUBLIC_WEB_PORT", default="")
    path = path.strip("/")

    admin.site.site_url = (
        f"{protocol}://{host}{':' + port if port else ''}{'/' + path if path else ''}/"
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


@admin.register(Metadata)
class MetadataAdmin(SingletonAdmin):
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "full_name",
                    "short_name",
                    "motto",
                    "website",
                )
            },
        ),
        (
            "Theme and Background Colors",
            {
                "fields": (
                    "theme_color",
                    "background_color",
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
                    "favicon",
                    "apple_touch_icon",
                    "pwa_192",
                    "pwa_512",
                ),
            },
        ),
        (
            "Social Media Sharing Images",
            {
                "fields": (
                    "og_image",
                    "twitter_image",
                ),
            },
        ),
    )


@admin.register(ContactInfo)
class ContactInfoAdmin(SingletonAdmin):
    fieldsets = (
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
                    "street",
                    "open_days",
                    "open_hours",
                    "map",
                )
            },
        ),
        (
            "Social Media",
            {
                "fields": (
                    "social_media_links_version",
                    "facebook",
                    "instagram",
                    "twitter_x",
                    "linkedin",
                    "spotify",
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
