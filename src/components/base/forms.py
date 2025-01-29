from django import forms

from .models import (
    AboutSection,
    CallToActionSection,
    ContactSection,
    HeaderHeroSection,
    ListSection,
)


class TitleFormMixin:
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if "title_h2" in self.fields:
            self.fields["title_h2"].widget = forms.Textarea(attrs={"rows": 2})
            self.fields["title_h3"].widget = forms.Textarea(attrs={"rows": 2})
            self.fields["title_p"].widget = forms.Textarea(attrs={"rows": 3})


class BaseAddForm(TitleFormMixin, forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)

        model = self._meta.model

        # Handle instance field
        if hasattr(model, "get_instances"):
            # Get all available choices for the section
            all_choices = model.get_instances()
            used_choices = model.objects.values_list(
                "section_instance", flat=True
            ).distinct()

            # Transform the choices to use readable format for display
            available_choices = [
                (
                    key,
                    f"{model._meta.verbose_name} at {model.get_readable_instance(key)}"
                    if key
                    else "--- No instances available ---",
                )
                for key, _ in all_choices
                if key not in used_choices
            ]

            self.fields["section_instance"].widget = forms.Select(
                choices=available_choices
                if available_choices
                else [("", "--- No instances available ---")]
            )

        # Handle version field
        version_choices = getattr(model, "SECTION_VERSION_CHOICES", None)
        if version_choices:
            self.fields["section_version"].widget = forms.Select(
                choices=version_choices
            )
            self.fields["section_version"].required = True
        else:
            self.fields["section_version"].widget = forms.HiddenInput()
            self.fields["section_version"].required = False

    class Meta:
        fields = "__all__"


class BaseChangeForm(TitleFormMixin, forms.ModelForm):
    def __init__(self, *args, **kwargs):
        # Handle instance field
        super().__init__(*args, **kwargs)
        self.fields["section_instance"].widget = forms.HiddenInput()

        # Handle version field
        model = self._meta.model
        version_choices = getattr(model, "SECTION_VERSION_CHOICES", None)
        if version_choices:
            self.fields["section_version"].widget = forms.Select(
                choices=version_choices
            )
            self.fields["section_version"].required = True
            if self.instance and self.instance.pk:
                self.fields["section_version"].initial = self.instance.section_version
        else:
            self.fields["section_version"].widget = forms.HiddenInput()
            self.fields["section_version"].required = False

    class Meta:
        fields = "__all__"


class MailForm(forms.Form):
    name = forms.CharField(
        max_length=100,
        widget=forms.TextInput(),
        error_messages={"required": "Please provide your name."},
    )
    email = forms.EmailField(
        widget=forms.EmailInput(),
        error_messages={"required": "Please provide a valid email address."},
    )
    subject = forms.CharField(
        max_length=200,
        widget=forms.TextInput(),
        error_messages={"required": "Please provide a subject for your message."},
    )
    message = forms.CharField(
        widget=forms.Textarea(),
        error_messages={"required": "Please enter your message."},
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


class ListSectionAddForm(BaseAddForm):
    class Meta(BaseAddForm.Meta):
        model = ListSection


class ListSectionChangeForm(BaseChangeForm):
    class Meta(BaseChangeForm.Meta):
        model = ListSection
