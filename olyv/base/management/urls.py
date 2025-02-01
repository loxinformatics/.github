from pathlib import Path

from .utils import process_urls

current_file = Path(__file__).resolve()
parent_dir = current_file.parent.parent
urlpatterns = process_urls("olyv.base", parent_dir, [], current_file)
