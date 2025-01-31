# https://docs.djangoproject.com/en/5.1/topics/http/urls/

from django.conf import settings
from django.conf.urls.static import static
from django.urls import include, path

from src.olyv.base.management.utils import adminsite_site_url

urlpatterns = [
    path("olyv/", include("src.olyv.base.urls")),
    # path("olyv/auth/", include("src.olyv.auth.urls")),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)


# Call the function to set the admin panel site URL, optionally passing a path
# You can pass a path like admin_site_url("/dashboard") if needed.
adminsite_site_url("/")
