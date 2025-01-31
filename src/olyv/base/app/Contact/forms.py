from ...widgets.section.forms import SectionAddForm, SectionChangeForm
from .models import Contact


class ContactAddForm(SectionAddForm):
    class Meta(SectionAddForm.Meta):
        model = Contact


class ContactChangeForm(SectionChangeForm):
    class Meta(SectionChangeForm.Meta):
        model = Contact
