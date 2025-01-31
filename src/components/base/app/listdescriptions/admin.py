from django.contrib import admin

from ...widgets.section.admin import SectionAdmin
from .forms import ListDescriptionsAddForm, ListDescriptionsChangeForm
from .models import ItemDescription, ListDescriptions


class ItemDescriptionInline(admin.StackedInline):
    model = ItemDescription
    extra = 1


@admin.register(ListDescriptions)
class ListDescriptionsAdmin(SectionAdmin):
    add_form = ListDescriptionsAddForm
    form = ListDescriptionsChangeForm
    model = ListDescriptions
    inlines = [ItemDescriptionInline]

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
    ]
