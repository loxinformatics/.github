from ..management.forms import BaseAddForm, BaseChangeForm
from .models import HeaderHeroSection


class HeaderHeroAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = HeaderHeroSection


class HeaderHeroChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = HeaderHeroSection
