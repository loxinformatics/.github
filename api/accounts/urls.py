from rest_framework.routers import SimpleRouter
from .views import AdminAccountViewSet, RegularAccountViewSet, GroupViewSet

accounts_router = SimpleRouter()
accounts_router.register(r"accounts/admin", AdminAccountViewSet)
accounts_router.register(r"accounts/regular", RegularAccountViewSet)
accounts_router.register(r"accounts/groups", GroupViewSet)
