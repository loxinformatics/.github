from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from .models import Base


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
