from ..management.forms import BaseAddForm, BaseChangeForm
from .models import ContactSection


class ContactAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = ContactSection


class ContactChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = ContactSection
