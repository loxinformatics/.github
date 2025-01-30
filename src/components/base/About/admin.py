from django.contrib import admin

from ..management.admin import SectionAdmin
from .forms import AboutAddForm, AboutChangeForm
from .models import AboutSection


@admin.register(AboutSection)
class AboutAdmin(SectionAdmin):
    add_form = AboutAddForm
    form = AboutChangeForm
    model = AboutSection

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        ("TITLE", {"fields": model.TITLE_FIELDS}),
        (
            "CONTENT",
            {"fields": ["about_content", "about_image", "about_video", "about_alt"]},
        ),
    ]
