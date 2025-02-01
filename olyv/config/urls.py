from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from ..config import conf

urlpatterns = [
    path("olyv/admin/", admin.site.urls),
]

# App URL mapping
OLYV_APPS = {
    "olyv.base": "olyv/base/",
    "olyv._auth": "olyv/_auth/",
}

# Dynamically add app URLs if installed
for app_name, url_prefix in OLYV_APPS.items():
    if app_name in settings.INSTALLED_APPS:
        urlpatterns += [
            path(url_prefix, include(f"{app_name}.management.urls")),
        ]

# Debug settings
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_url = conf.adminsite.site_url
