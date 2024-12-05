from django.contrib import admin

from .forms import ContactForm
from .models import Contact


class AddressAdmin(admin.ModelAdmin):
    form = ContactForm

    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(Contact, AddressAdmin)
