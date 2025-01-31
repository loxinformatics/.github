from django.contrib import admin

from ...widgets.nav.admin import NavigationItemInline
from ...widgets.section.admin import SectionAdmin
from .forms import HeaderHeroAddForm, HeaderHeroChangeForm
from .models import HeaderHero


class HeaderHeroNavigationItemInline(NavigationItemInline):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(section_type="header")


@admin.register(HeaderHero)
class HeaderHeroAdmin(SectionAdmin):
    add_form = HeaderHeroAddForm
    form = HeaderHeroChangeForm
    model = HeaderHero
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
