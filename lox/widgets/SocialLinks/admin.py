from django.contrib import admin

from .models import SocialLinks


class SocialLinkAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return not self.model.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False


admin.site.register(SocialLinks, SocialLinkAdmin)
