from importlib import import_module
from pathlib import Path
from typing import List

from django.conf import settings
from django.contrib import admin
from django.urls import include, path
from termcolor import colored


def get_module_path(file_path: Path, app_name: str) -> str | None:
    """Convert file path to module path, ensuring it starts from app_name."""
    module_path = str(file_path.parent).replace("/", ".").replace("\\", ".")

    if app_name in module_path:
        return module_path[module_path.index(app_name) :]

    print(colored(f"⚠️ Skipping {module_path}, does not contain {app_name}", "yellow"))
    return None


def process_urls(
    app_name: str,
    parent_dir: Path,
    excluded_file_paths: List[Path],
    exclude_self: bool = True,
) -> list:
    """Process URLs."""
    urls = []
    processed_paths = set()

    def process_url_file(file_path: Path) -> None:
        if file_path in processed_paths or file_path in excluded_file_paths:
            return

        processed_paths.add(file_path)
        module_path = get_module_path(file_path, app_name)

        if not module_path:
            return

        try:
            module_name = f"{module_path}.urls"
            urls.append(path("", include(module_name)))
        except ModuleNotFoundError as e:
            print(colored(f"❌ Failed to include {module_name}: {e}", "red"))

    for file_path in parent_dir.rglob("urls.py"):
        if file_path.samefile(parent_dir / "urls.py") and exclude_self:
            continue
        process_url_file(file_path)

    return urls


def import_app_modules(
    app_name: str,
    file_pattern: str,
    parent_dir: Path,
    excluded_file_paths: List[Path],
) -> None:
    """Import app modules."""
    processed_paths = set()

    for file_path in parent_dir.rglob(file_pattern):
        if file_path in processed_paths or file_path in excluded_file_paths:
            continue

        processed_paths.add(file_path)
        module_path = get_module_path(file_path, app_name)

        if module_path:
            module_name = f"{module_path}.{file_path.stem}"
            try:
                import_module(module_name)
            except ModuleNotFoundError as e:
                print(colored(f"❌ Failed to import {module_name}: {e}", "red"))


def adminsite_site_url(path: str = "") -> None:
    """Set admin site URL."""
    path = path.strip("/")
    admin.site.site_url = f"{settings.NEXT_URL}{'/' + path if path else ''}/"
