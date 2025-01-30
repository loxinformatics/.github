from django.contrib import admin

from ..management.admin import SectionAdmin
from .forms import ListSectionAddForm, ListSectionChangeForm
from .models import ListItem, ListSection


class ListItemInline(admin.StackedInline):
    model = ListItem
    extra = 1


@admin.register(ListSection)
class ListSectionAdmin(SectionAdmin):
    add_form = ListSectionAddForm
    form = ListSectionChangeForm
    model = ListSection
    inlines = [ListItemInline]

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
    ]
