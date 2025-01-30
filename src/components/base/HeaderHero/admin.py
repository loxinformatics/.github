from django.contrib import admin

from ..management.admin import NavigationItemInline, SectionAdmin
from .forms import HeaderHeroAddForm, HeaderHeroChangeForm
from .models import HeaderHeroSection


class HeaderHeroNavigationItemInline(NavigationItemInline):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(section_type="header")


@admin.register(HeaderHeroSection)
class HeaderHeroAdmin(SectionAdmin):
    add_form = HeaderHeroAddForm
    form = HeaderHeroChangeForm
    model = HeaderHeroSection
    inlines = [HeaderHeroNavigationItemInline]

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        (
            "HEADER SETTINGS",
            {
                "fields": [
                    "header_background",
                    "logo_version",
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
