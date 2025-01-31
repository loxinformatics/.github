from django.contrib import admin

from ...widgets.nav.admin import NavigationItemInline
from ...widgets.section.admin import SectionAdmin
from .models import Sidebar


class SidebarNavigationItemInline(NavigationItemInline):
    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.filter(section_type="sidebar")


@admin.register(Sidebar)
class SidebarAdmin(SectionAdmin):
    inlines = [SidebarNavigationItemInline]
    model = Sidebar
