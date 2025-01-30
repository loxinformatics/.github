from importlib import import_module
from pathlib import Path

from django.apps import apps
from termcolor import colored


def recursive_import(file: str, app_label: str):
    file = Path(file)
    parent_dir = Path(__file__).parent.parent.parent
    excluded_file = parent_dir / "management" / file

    # Get the app name dynamically
    try:
        app_name = apps.get_app_config(app_label).name
    except LookupError:
        print(
            colored(
                f"⚠️ App '{app_label}' not found. Check your INSTALLED_APPS.", "yellow"
            )
        )
        return

    for found_file in parent_dir.rglob(file.name):
        if found_file == excluded_file:
            continue

        # Convert the path to a module path
        module_path = str(found_file.parent).replace("/", ".").replace("\\", ".")

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

        module_name = f"{module_path}.{file.stem}"

        try:
            import_module(module_name)
        except ModuleNotFoundError as e:
            print(colored(f"❌ Failed to import {module_name}: {e}", "red"))
