from dataclasses import dataclass
from typing import Literal
from urllib.parse import urlunparse

from decouple import Csv, config


def protocol(value: str) -> Literal["http", "https"]:
    """Ensure protocol is either 'http' or 'https'."""
    if value not in ("http", "https"):
        raise ValueError("Protocol must be either 'http' or 'https'")
    return value


@dataclass
class URL:
    protocol: Literal["http", "https"]
    host: str
    port: str | None = None

    def __str__(self) -> str:
        """Convert URL to string format."""
        netloc = self.host
        if self.port:
            netloc = f"{self.host}:{self.port}"
        return urlunparse((self.protocol, netloc, "/", "", "", ""))

    def __truediv__(self, path: str) -> str:
        """Allow URL / path concatenation with trailing slash."""
        base = str(self).rstrip("/")
        path = path.strip("/")
        return f"{base}/{path}/"


class DjangoConfig:
    def __init__(self):
        self.protocol = config("DJANGO_PROTOCOL", default="http", cast=protocol)
        self.host = config("DJANGO_HOST", default="localhost").rstrip("/")
        self.port = config("DJANGO_PORT", default="8000")

    @property
    def url(self) -> URL:
        """Return a URL object for the Django server."""
        return URL(self.protocol, self.host, self.port)


class NextConfig:
    def __init__(self):
        self.protocol = config("NEXT_PROTOCOL", default="http", cast=protocol)
        self.host = config("NEXT_HOST", default="localhost").rstrip("/")
        self.port = config("NEXT_PORT", default="3000")

    @property
    def url(self) -> URL:
        """Return a URL object for the Next.js server."""
        return URL(self.protocol, self.host, self.port)


class DatabasesConfig:
    def __init__(self):
        self.engine = config("DB_ENGINE", default="django.db.backends.sqlite3")
        self.name = config("DB_NAME", default="db.sqlite3")
        self.user = config("DB_USER", default="")
        self.password = config("DB_PASSWORD", default="")
        self.host = config("DB_HOST", default="")
        self.port = config("DB_PORT", default="")


class EmailConfig:
    def __init__(self):
        self.backend = config(
            "EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend"
        )
        self.host = config("EMAIL_HOST", default="")
        self.use_tls = config("EMAIL_USE_TLS", default=True, cast=bool)
        self.use_ssl = config("EMAIL_USE_SSL", default=False, cast=bool)
        self.port = config("EMAIL_PORT", default="587")
        self.host_user = config("EMAIL_HOST_USER", default="")
        self.host_password = config("EMAIL_HOST_PASSWORD", default="")


class OlyvConfig:
    def __init__(self):
        self.secret_key = config(
            "SECRET_KEY", default="8thn$cz4wou+(du$re)mj3v$6v78**pk7!#ic@08s_s$hf*fd^"
        )
        self.allowed_hosts = config(
            "ALLOWED_HOSTS", default="localhost,127.0.0.1", cast=Csv()
        )
        self.debug = config("DEBUG", default=True, cast=bool)
        self.django = DjangoConfig()
        self.next = NextConfig()
        self.db = DatabasesConfig()
        self.email = EmailConfig()


olyv_config = OlyvConfig()
