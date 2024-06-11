from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from base.urls import base_router

root_url = settings.ROOT_URL + "/" if settings.ROOT_URL else ""

urlpatterns = [
    path(f"{root_url}admin/", admin.site.urls),
    path(f"{root_url}rest/", include("rest_framework.urls")),
    path(f"{root_url}auth/", include("authentication.urls")),
]


class CombinedRouter(DefaultRouter):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.registry.extend(base_router.registry)

        if "users" in settings.INSTALLED_APPS:
            from users.urls import users_router

            self.registry.extend(users_router.registry)


router = CombinedRouter()

urlpatterns += [
    path(f"{root_url}", include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
