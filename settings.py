from datetime import timedelta
from pathlib import Path

from decouple import Csv, config

# --------------------------------------------------------------------
# BASE DIRECTORY
# --------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent

# --------------------------------------------------------------------
# QUICK START SETTINGS
# --------------------------------------------------------------------

SECRET_KEY = config("SECRET_KEY")  # * Keep the secret key used in production secret!
DEBUG = config("ENVIRONMENT", default="development") != "production"
ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())

# --------------------------------------------------------------------
# APPLICATION DEFINITION
# --------------------------------------------------------------------

INSTALLED_APPS = [
    # Django default apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Third-party apps
    "rest_framework",  # Docs: https://www.django-rest-framework.org/
    "rest_framework_simplejwt",  # Docs: https://django-rest-framework-simplejwt.readthedocs.io/
    "corsheaders",  # Docs: https://pypi.org/project/django-cors-headers/
    # Local apps
    "app",
    "components.base",
]

APP_DIR = BASE_DIR / "app"  # Directory for the main application

ROOT_URLCONF = "app.urls"

API_PATH = config("NEXT_PUBLIC_API_PATH", default="api")  # Base path for APIs

NEXTJS_PROTOCOL = config("NEXTJS_PROTOCOL", default="http")
NEXTJS_HOST = str(config("NEXTJS_HOST", default="localhost")).strip("/")
NEXTJS_PORT = config("NEXTJS_PORT", default="")

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

WSGI_APPLICATION = "wsgi.application"

# --------------------------------------------------------------------
# DATABASE CONFIGURATION
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": config("DB_ENGINE", default="django.db.backends.sqlite3"),
        "NAME": config("DB_NAME", default="db.sqlite3"),
        "USER": config("DB_USER", default=""),
        "PASSWORD": config("DB_PASSWORD", default=""),
        "HOST": config("DB_HOST", default=""),
        "PORT": config("DB_PORT", default=""),
    }
}

# --------------------------------------------------------------------
# TEMPLATES
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/ref/settings/#templates

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

# --------------------------------------------------------------------
# PASSWORD VALIDATION
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/topics/auth/passwords/#module-django.contrib.auth.password_validation

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

# --------------------------------------------------------------------
# DJANGO REST FRAMEWORK SETTINGS
# --------------------------------------------------------------------
# Docs: https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
}

# --------------------------------------------------------------------
# SIMPLE JWT SETTINGS
# --------------------------------------------------------------------
# Docs: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
}

# --------------------------------------------------------------------
# CORSHEADERS SETTINGS
# --------------------------------------------------------------------
# Docs: https://pypi.org/project/django-cors-headers/

CORS_ALLOW_CREDENTIALS = True

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = []

# --------------------------------------------------------------------
# CSRF SETTINGS
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/ref/csrf/

# TODO: Add Csrf Protection Capability
CSRF_TRUSTED_ORIGINS = [
    f"{NEXTJS_PROTOCOL}://{NEXTJS_HOST}{':' + NEXTJS_PORT if NEXTJS_PORT else ''}",
    "https://localhost:8000",  # for GitHub Codespaces
]

# --------------------------------------------------------------------
# EMAIL SETTINGS
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/topics/email/

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend"
    if DEBUG
    else config("EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend")
)
EMAIL_HOST = config("EMAIL_HOST", default="")
EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)
EMAIL_USE_SSL = config("EMAIL_USE_SSL", default=False, cast=bool)
EMAIL_PORT = config("EMAIL_PORT", default="587")
EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")
EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")

# --------------------------------------------------------------------
# STATIC FILES SETTINGS
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/howto/static-files/

STATIC_URL = "public/static/"
STATIC_ROOT = BASE_DIR / "public" / "static"

# --------------------------------------------------------------------
# MEDIA FILES SETTINGS
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/ref/settings/#media-root

MEDIA_URL = "public/media/"
MEDIA_ROOT = BASE_DIR / "public" / "media"

# --------------------------------------------------------------------
# INTERNATIONALIZATION
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/topics/i18n/

LANGUAGE_CODE = "en-us"
TIME_ZONE = "Africa/Nairobi"
USE_I18N = True
USE_TZ = True

# --------------------------------------------------------------------
# DEFAULT PRIMARY KEY FIELD TYPE
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
