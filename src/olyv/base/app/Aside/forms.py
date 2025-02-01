from ...widgets.layout.Section.forms import SectionAddForm, SectionChangeForm
from .models import Aside


class AsideAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = Aside


class AsideChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = Aside
