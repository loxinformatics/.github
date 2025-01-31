from django.contrib import admin

from ...widgets.section.admin import SectionAdmin
from .forms import ContactAddForm, ContactChangeForm
from .models import Contact


@admin.register(Contact)
class ContactAdmin(SectionAdmin):
    add_form = ContactAddForm
    form = ContactChangeForm
    model = Contact

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
        ("CONTENT", {"fields": ["map_URL", "open_days", "open_hours"]}),
    ]
