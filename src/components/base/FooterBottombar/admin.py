from django.contrib import admin

from ..management.admin import NavigationItemInline, SectionAdmin
from .forms import FooterBottombarSectionAddForm, FooterBottombarSectionChangeForm
from .models import FooterBottombarSection


class FooterBottombarNavigationItemInline(NavigationItemInline):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(section_type="footer")


@admin.register(FooterBottombarSection)
class FooterBottombarAdmin(SectionAdmin):
    add_form = FooterBottombarSectionAddForm
    form = FooterBottombarSectionChangeForm
    inlines = [FooterBottombarNavigationItemInline]
    model = FooterBottombarSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
    ]
