# https://docs.djangoproject.com/en/5.1/topics/http/urls/

from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path(f"{settings.BASE_URLPATH}/admin/", admin.site.urls),
    path(f"{settings.BASE_URLPATH}/", include("src.components.base.urls")),
    path(f"{settings.BASE_URLPATH}/auth/", include("src.components.auth.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


def adminsite_site_url(path: str = ""):
    path = path.strip("/")

    admin.site.site_url = f"{settings.NEXT_URL}{'/' + path if path else ''}/"


# Call the function to set the admin panel site URL, optionally passing a path
# You can pass a path like admin_site_url("/dashboard") if needed.
adminsite_site_url("/")
