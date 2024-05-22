from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from django.views.generic import TemplateView
from django.views.static import serve
from django.conf.urls.static import static


urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

next_app = TemplateView.as_view(template_name="index.html")

# Ensure routes in next js front end are here
# so that Client-based routing works correctly
urlpatterns += [
    path("", next_app),
]

# metadata assets
urlpatterns += [
    path("favicon.ico/", serve, {'path': 'favicon.ico', 'document_root': settings.BUILD_DIR}),
    path("apple-touch.jpg/", serve, {'path': 'apple-touch.jpg', 'document_root': settings.BUILD_DIR}),
    path("logo.jpg/", serve, {'path': 'logo.jpg', 'document_root': settings.BUILD_DIR}),
    path("manifest.webmanifest/", serve, {'path': 'manifest.webmanifest', 'document_root': settings.BUILD_DIR}),
    path("sitemap.xml/", serve, {'path': 'sitemap.xml', 'document_root': settings.BUILD_DIR}),
    path("robots.txt/", serve, {'path': 'robots.txt', 'document_root': settings.BUILD_DIR}),
    path("opengraph-image.jpg/", serve, {'path': 'opengraph-image.jpg', 'document_root': settings.BUILD_DIR}),
]
