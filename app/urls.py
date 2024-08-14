# https://docs.djangoproject.com/en/5.0/topics/http/urls/

from decouple import config
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("api/rest/", include("rest_framework.urls")),
    path("api/ckeditor5/", include("django_ckeditor_5.urls")),
    path("api/admin/", admin.site.urls),
    path("api/access-token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/refresh-token/", TokenRefreshView.as_view(), name="token_refresh"),
    # components
    path("api/mail/", include("lox.widgets.MailForm.urls")),
    path("api/social-links/", include("lox.widgets.SocialLinks.urls")),
    path("api/contact/", include("lox.layout.Contact.urls")),
    path("api/services/", include("lox.layout.Services.urls")),
    path("api/users/", include("lox.layout.Users.urls")),
    path("api/about/", include("custom.About.urls")),
]

# admin.site.index_template = "app/main-admin.html"
admin.site.site_title = f'{config("NEXT_PUBLIC_SHORT_NAME", default="Django")} Admin'
admin.site.site_header = (
    f'{config("NEXT_PUBLIC_SHORT_NAME", default="Django")} Admin Panel'
)
admin.site.index_title = (
    f'{config("NEXT_PUBLIC_FULL_NAME", default="Django")} Administration'
)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
