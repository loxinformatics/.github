from django.urls import path

from .views import MailAPIView

urlpatterns = [
    path("", MailAPIView.as_view(), name="mail"),
]
