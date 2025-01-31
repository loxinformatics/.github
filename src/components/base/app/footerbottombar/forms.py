from ...widgets.section.forms import SectionAddForm, SectionChangeForm
from .models import FooterBottombar


class FooterBottombarAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = FooterBottombar


class FooterBottombarChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = FooterBottombar
