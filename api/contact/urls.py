from rest_framework.routers import SimpleRouter
from .views import ContactViewSet, MailViewSet

contact_router = SimpleRouter()
contact_router.register(r"contact/info", ContactViewSet)
contact_router.register(r"contact/mail", MailViewSet, basename="contact/mail")
