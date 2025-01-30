from ..management.forms import BaseAddForm, BaseChangeForm
from .models import AboutSection


class AboutAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = AboutSection


class AboutChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = AboutSection
