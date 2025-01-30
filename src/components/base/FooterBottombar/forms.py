from ..management.forms import BaseAddForm, BaseChangeForm
from .models import FooterBottombarSection


class FooterBottombarSectionAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = FooterBottombarSection


class FooterBottombarSectionChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = FooterBottombarSection
