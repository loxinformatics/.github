from ..management.forms import BaseAddForm, BaseChangeForm
from .models import ListSection


class ListSectionAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = ListSection


class ListSectionChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = ListSection
