from ...widgets.layout.Section.forms import SectionAddForm, SectionChangeForm
from .models import ListDescriptions


class ListDescriptionsAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = ListDescriptions


class ListDescriptionsChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = ListDescriptions
