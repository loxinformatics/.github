# urls.py
from pathlib import Path

from .utils import get_urlpatterns

urlpatterns = get_urlpatterns(
    "src.components.base", Path(__file__).resolve().parent, []
)
