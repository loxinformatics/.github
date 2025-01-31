from django.contrib import admin

from .models import NavigationItem


class NavigationItemInline(admin.StackedInline):
    model = NavigationItem
    extra = 1
    fields = ["text", "icon", "href", "type", "parent", "authorized", "order"]
