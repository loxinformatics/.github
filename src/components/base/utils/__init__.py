from importlib import import_module
from pathlib import Path

from django.urls import include, path
from termcolor import colored


def process_modules(
    app_name: str,
    file_path: Path,
    parent_dir: Path,
    excluded_file_paths: list[Path],
    process_func,
):
    for found_file_path in parent_dir.rglob(file_path.name):
        if found_file_path in excluded_file_paths:
            continue

        # Convert the path to a module path
        module_path = str(found_file_path.parent).replace("/", ".").replace("\\", ".")

        # Ensure we only keep the part starting from `app_name`
        if app_name in module_path:
            module_path = module_path[module_path.index(app_name) :]
        else:
            print(
                colored(
                    f"⚠️ Skipping {module_path}, does not contain {app_name}", "yellow"
                )
            )
            continue

        process_func(module_path, file_path)


def import_module_func(module_path: str, file_path: Path):
    module_name = f"{module_path}.{file_path.stem}"
    try:
        import_module(module_name)
    except ModuleNotFoundError as e:
        print(colored(f"❌ Failed to import {module_name}: {e}", "red"))


def include_url_func(module_path: str, file_path: Path, urls: list):
    try:
        urls.append(path("", include(f"{module_path}.{file_path.stem}")))
    except ModuleNotFoundError as e:
        print(
            colored(f"❌ Failed to include {module_path}.{file_path.stem}: {e}", "red")
        )


def import_app_modules(
    app_name: str, file_path: Path, parent_dir: Path, excluded_file_paths: list[Path]
):
    process_modules(
        app_name, file_path, parent_dir, excluded_file_paths, import_module_func
    )


def get_urlpatterns(app_name: str, parent_dir: Path, excluded_file_paths: list[Path]):
    urls = []
    process_modules(
        app_name,
        Path("urls.py"),
        parent_dir,
        excluded_file_paths,
        lambda module_path, file_path: include_url_func(
            module_path, file_path, urls
        ),  # * Using lambda to pass the extra 'urls' parameter as process_func only allows two parameters
    )
    return urls
