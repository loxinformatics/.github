from django.contrib import admin

from ...widgets.layout.Section.admin import SectionAdmin
from ...widgets.nav.admin import NavigationItemInline
from .models import Aside


class AsideNavigationItemInline(NavigationItemInline):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(section_type="aside")


@admin.register(Aside)
class AsideAdmin(SectionAdmin):
    inlines = [AsideNavigationItemInline]
    model = Aside
