from ...widgets.section.forms import SectionAddForm, SectionChangeForm
from .models import Sidebar


class SidebarAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = Sidebar


class SidebarChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = Sidebar
