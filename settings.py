from datetime import timedelta
from pathlib import Path

from olyv.config import conf

# --------------------------------------------------------------------
# DIRECTORIES
# --------------------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
APP_DIR = BASE_DIR / "src" / "app"


# --------------------------------------------------------------------
# QUICK START SETTINGS
# --------------------------------------------------------------------

DEBUG = conf.debug
SECRET_KEY = conf.secret_key
ALLOWED_HOSTS = conf.allowed_hosts


# --------------------------------------------------------------------
# APPLICATION DEFINITION
# --------------------------------------------------------------------

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "corsheaders",
    "src.app",
    "olyv.base",
    "olyv._auth",
]

ROOT_URLCONF = "olyv.config.urls"

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
        "ENGINE": conf.db.engine,
        "NAME": conf.db.name,
        "USER": conf.db.user,
        "PASSWORD": conf.db.password,
        "HOST": conf.db.host,
        "PORT": conf.db.port,
    }
}


# --------------------------------------------------------------------
# EMAIL SETTINGS
# --------------------------------------------------------------------
# Docs: https://docs.djangoproject.com/en/stable/topics/email/

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend" if DEBUG else conf.email.backend
)
EMAIL_HOST = conf.email.host
EMAIL_USE_TLS = conf.email.use_tls
EMAIL_USE_SSL = conf.email.use_ssl
EMAIL_PORT = conf.email.port
EMAIL_HOST_USER = conf.email.host_user
EMAIL_HOST_PASSWORD = conf.email.host_password


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
