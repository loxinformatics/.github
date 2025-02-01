from django.contrib import admin

class SectionAdmin(admin.ModelAdmin):
    """Base admin class for section models with customized form handling."""

    def get_form(self, request, obj=None, **kwargs):
        if obj is None:
            return self.add_form
        return super().get_form(request, obj, **kwargs)

