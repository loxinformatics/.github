from ..widgets.section.forms import SectionAddForm, SectionChangeForm
from .models import HeaderHero


class HeaderHeroAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = HeaderHero


class HeaderHeroChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = HeaderHero
