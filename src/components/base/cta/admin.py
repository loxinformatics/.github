from django.contrib import admin

from ..widgets.section.admin import SectionAdmin
from .forms import CTAAddForm, CTAChangeForm
from .models import CTA


@admin.register(CTA)
class CTAAdmin(SectionAdmin):
    add_form = CTAAddForm
    form = CTAChangeForm
    model = CTA

    fieldsets = [
        (None, {"fields": ["section_instance", "section_version"]}),
        (
            "CONTENT",
            {
                "fields": [
                    "cta_heading",
                    "cta_paragraph",
                    "cta_button_text",
                    "cta_button_href",
                    "cta_button_icon",
                    "cta_image",
                ]
            },
        ),
    ]
