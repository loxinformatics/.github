from ...widgets.section.forms import SectionAddForm, SectionChangeForm
from .models import CTA


class CTAAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = CTA


class CTAChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = CTA
