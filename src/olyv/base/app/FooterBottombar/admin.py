from django.contrib import admin

from ...widgets.layout.Section.admin import SectionAdmin
from ...widgets.nav.admin import NavigationItemInline
from .forms import FooterBottombarAddForm, FooterBottombarChangeForm
from .models import FooterBottombar


class FooterBottombarNavigationItemInline(NavigationItemInline):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(section_type="footer")


@admin.register(FooterBottombar)
class FooterBottombarAdmin(SectionAdmin):
    add_form = FooterBottombarAddForm
    form = FooterBottombarChangeForm
    inlines = [FooterBottombarNavigationItemInline]
    model = FooterBottombar

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
    ]
