from typing import List, Tuple

from django.conf import settings
from django.db import models


class Section(models.Model):
    section_instance = models.CharField(
        max_length=255,
        primary_key=True,
        unique=True,
        help_text="Select the instance",
    )
    section_version = models.CharField(
        max_length=2,
        blank=True,
        help_text="Choose the version (How the section will appear)",
    )

    # title
    TITLE_FIELDS = ["title_version", "title_h2", "title_h3", "title_p"]

    TITLE_VERSION_CHOICES = [
        ("V1", "Version 1"),
        ("V2", "Version 2"),
        ("V3", "Version 3"),
    ]
    title_version = models.CharField(
        max_length=2,
        choices=TITLE_VERSION_CHOICES,
        default=TITLE_VERSION_CHOICES[0][0],
        blank=True,
    )
    title_h2 = models.CharField(max_length=255, blank=True)
    title_h3 = models.CharField(max_length=255, blank=True)
    title_p = models.CharField(max_length=500, blank=True)

    @staticmethod
    def _process_files(
        instances: list, patterns: List[str], file_type: str, component: str
    ) -> None:
        """Helper method to process files and find component instances."""

        for pattern in patterns:
            for file in settings.APP_DIR.rglob(pattern):
                content = file.read_text(encoding="utf-8")
                component_count = content.count(f"<{component}")

                if component_count > 0:
                    parts = file.relative_to(settings.APP_DIR).parts
                    path = "/" + "/".join(parts[:-1]) if len(parts) > 1 else "/"
                    safe_path = path.replace("/", "_").replace("-", "_").strip("_")

                    for i in range(component_count):
                        instance_key = (
                            f"{safe_path}{'_' if safe_path else ''}{file_type}_{i + 1}"
                        )
                        instances.append(
                            (
                                instance_key,
                                f"{component} {i + 1} at {path} ({file_type})",
                            )
                        )

    @classmethod
    def get_instances(cls) -> List[Tuple[str, str]]:
        """
        Get all instances where this section component is used in the Next.js pages.
        Returns a list of tuples containing (instance_key, readable_instance_name).
        """
        instances = []
        page_patterns = ["page.tsx", "page.js", "page.jsx"]
        layout_patterns = ["layout.tsx", "layout.js", "layout.jsx"]

        cls._process_files(instances, page_patterns, "page", cls.__name__)
        cls._process_files(instances, layout_patterns, "layout", cls.__name__)

        return instances or [("", "--- No instances available ---")]

    @staticmethod
    def get_readable_instance(instance_key: str) -> str:
        """Convert a section instance key to a human-readable format."""

        if not instance_key:
            return "--- No instances available ---"

        # Handle numbered instances without path (e.g., "page_1" or "layout_1")
        if "_" in instance_key:
            parts = instance_key.split("_")
            if (
                len(parts) == 2
                and parts[0] in ["page", "layout"]
                and parts[1].isdigit()
            ):
                return f"/ #{parts[1]} ({parts[0]})"

        # Extract the number and file type from the end
        parts = instance_key.rsplit("_", 2)
        if len(parts) >= 2 and parts[-1].isdigit():
            path = parts[0].replace("_", "/")
            file_type = parts[-2]  # Will be either "page" or "layout"
            return f"/{path} #{parts[-1]} ({file_type})"

        return instance_key

    def __str__(self):
        return f"{self._meta.verbose_name.capitalize()} at {self.get_readable_instance(self.section_instance)}"

    class Meta:
        abstract = True
