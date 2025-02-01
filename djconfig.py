from datetime import timedelta
from pathlib import Path

from olyv.config import olyv_config

# --------------------------------------------------------------------
# BASE / PROJECT DIRECTORY
# --------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent


# --------------------------------------------------------------------
# APPLICATION DEFINITION
# --------------------------------------------------------------------

APP_DIR = BASE_DIR / "src" / "app"

ROOT_URLCONF = "src.urls"

INSTALLED_APPS = [
    # Django default apps
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Vendor apps
    "rest_framework",  # Docs: https://www.django-rest-framework.org/
    "rest_framework_simplejwt",  # Docs: https://django-rest-framework-simplejwt.readthedocs.io/
    "corsheaders",  # Docs: https://pypi.org/project/django-cors-headers/
    # Olyv apps
    "olyv.base",
    "olyv.authentication",
]

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
# QUICK START SETTINGS
# --------------------------------------------------------------------

DEBUG = olyv_config.debug
SECRET_KEY = olyv_config.secret_key
ALLOWED_HOSTS = olyv_config.allowed_hosts


# --------------------------------------------------------------------
# DATABASE CONFIGURATION
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": olyv_config.db.engine,
        "NAME": olyv_config.db.name,
        "USER": olyv_config.db.user,
        "PASSWORD": olyv_config.db.password,
        "HOST": olyv_config.db.host,
        "PORT": olyv_config.db.port,
    }
}


# --------------------------------------------------------------------
# EMAIL SETTINGS
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/topics/email/

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend"
    if DEBUG
    else olyv_config.email.backend
)
EMAIL_HOST = olyv_config.email.host
EMAIL_USE_TLS = olyv_config.email.use_tls
EMAIL_USE_SSL = olyv_config.email.use_ssl
EMAIL_PORT = olyv_config.email.port
EMAIL_HOST_USER = olyv_config.email.host_user
EMAIL_HOST_PASSWORD = olyv_config.email.host_password


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
