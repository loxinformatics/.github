from django.contrib import admin

from ..widgets.section.admin import SectionAdmin
from .forms import AboutAddForm, AboutChangeForm
from .models import About


@admin.register(About)
class AboutAdmin(SectionAdmin):
    add_form = AboutAddForm
    form = AboutChangeForm
    model = About

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
        (
            "CONTENT",
            {"fields": ["about_content", "about_image", "about_video", "about_alt"]},
        ),
    ]
