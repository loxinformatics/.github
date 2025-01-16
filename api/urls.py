# https://docs.djangoproject.com/en/5.1/topics/http/urls/

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

from zeytinus.api.base.admin import admin_site_url

urlpatterns = [
    path(f"{settings.API_BASEPATH}/admin/", admin.site.urls),
    # BaseApiURL
    path(f"{settings.API_BASEPATH}/base/", include("zeytinus.api.base.urls")),
    # AuthApiURL
    path(f"{settings.API_BASEPATH}/auth/", include("zeytinus.api.auth.urls")),
    # CoreApiURL
    path(f"{settings.API_BASEPATH}/core/", include("zeytinus.api.core.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


# Call the function to set the admin panel site URL, optionally passing a path
# You can pass a path like admin_site_url("/dashboard") if needed.
admin_site_url("/dashboard")
