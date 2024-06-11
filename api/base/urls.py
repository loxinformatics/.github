from rest_framework.routers import SimpleRouter
from base.views import BaseViewSet, MailUsViewSet

base_router = SimpleRouter()
base_router.register(r"base/info", BaseViewSet)
base_router.register(r"base/mail", MailUsViewSet, basename="base/mail-us")
