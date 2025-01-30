from ..management.forms import BaseAddForm, BaseChangeForm
from .models import CallToActionSection


class CTAAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = CallToActionSection


class CTAChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = CallToActionSection
