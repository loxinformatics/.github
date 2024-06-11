from rest_framework.routers import SimpleRouter
from .views import AdminUserViewSet, RegularUserViewSet, GroupViewSet

users_router = SimpleRouter()
users_router.register(r"users/admin", AdminUserViewSet)
users_router.register(r"users/regular", RegularUserViewSet)
users_router.register(r"users/groups", GroupViewSet)
