from ...widgets.layout.Section.forms import SectionAddForm, SectionChangeForm
from .models import About


class AboutAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = About


class AboutChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = About
