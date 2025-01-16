from ..base.forms import BaseAddForm, BaseChangeForm
from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ListSection,
)


class HeaderHeroAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = HeaderHeroSection


class HeaderHeroChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = HeaderHeroSection


class AboutAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = AboutSection


class AboutChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = AboutSection


class CTAAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = CallToActionSection


class CTAChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = CallToActionSection


class ContactAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = ContactSection


class ContactChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = ContactSection


class ListDescriptionsAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = ListSection


class ListDescriptionsChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = ListSection
