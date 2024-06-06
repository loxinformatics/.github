from rest_framework.routers import SimpleRouter
from .views import BaseViewSet

base_router = SimpleRouter()
base_router.register(r"base", BaseViewSet)
