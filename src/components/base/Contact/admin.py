from django.contrib import admin

from ..management.admin import SectionAdmin
from .forms import ContactAddForm, ContactChangeForm
from .models import ContactSection


@admin.register(ContactSection)
class ContactAdmin(SectionAdmin):
    add_form = ContactAddForm
    form = ContactChangeForm
    model = ContactSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
        ("CONTENT", {"fields": ["map_URL", "open_days", "open_hours"]}),
    ]
