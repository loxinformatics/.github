from datetime import timedelta
from pathlib import Path

from decouple import Csv, config

# Build paths inside the project like this: BASE_DIR / 'subdir'.

BASE_DIR = Path(__file__).resolve().parent.parent.parent

API_BASEPATH = config("NEXT_PUBLIC_API_BASEPATH", default="api")

# Quick Start Settings

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config("SECRET_KEY")

DEBUG = config("ENVIRONMENT", default="development") != "production"

ALLOWED_HOSTS = config("ALLOWED_HOSTS", cast=Csv())

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "django_filters",
    "rest_framework_simplejwt",
    "corsheaders",
    # olyv
    "olyv.api.base",
    "olyv.api.core",
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

ROOT_URLCONF = "src.api.urls"

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

WSGI_APPLICATION = "src.api.wsgi.application"


# Password validation: https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"
    },
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]


# Database: https://docs.djangoproject.com/en/5.1/ref/settings/#databases

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


# Django Rest Framework: https://www.django-rest-framework.org/api-guide/settings/

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
        "rest_framework.authentication.SessionAuthentication",
    ),
}


# Simple JWT: https://django-rest-framework-simplejwt.readthedocs.io/en/latest/settings.html#

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
}


# Corsheaders: https://pypi.org/project/django-cors-headers/

CORS_ALLOW_CREDENTIALS = True

if DEBUG:
    CORS_ALLOW_ALL_ORIGINS = True
else:
    CORS_ALLOWED_ORIGINS = []


# CSRF: https://docs.djangoproject.com/en/5.1/ref/csrf/
# TODO: Add Csrf Protection Capability

CSRF_TRUSTED_ORIGINS = [
    f"{config('NEXT_PUBLIC_WEB_PROTOCOL', default='http')}://"
    f"{config('NEXT_PUBLIC_WEB_HOST', default='localhost').strip('/')}"
    f"{':' + config('NEXT_PUBLIC_WEB_PORT', default='') if config('NEXT_PUBLIC_WEB_PORT', default='') else ''}",
    "https://localhost:8000",  # for GitHub Codespaces
]


# Email: https://docs.djangoproject.com/en/5.1/topics/email/

EMAIL_BACKEND = (
    "django.core.mail.backends.console.EmailBackend"
    if DEBUG
    else config("EMAIL_BACKEND", default="django.core.mail.backends.smtp.EmailBackend")
)

EMAIL_HOST = config("EMAIL_HOST", default="")

EMAIL_PORT = config("EMAIL_PORT", default="587")

EMAIL_USE_TLS = config("EMAIL_USE_TLS", default=True, cast=bool)

EMAIL_USE_SSL = config("EMAIL_USE_SSL", default=False, cast=bool)

EMAIL_HOST_USER = config("EMAIL_HOST_USER", default="")

EMAIL_HOST_PASSWORD = config("EMAIL_HOST_PASSWORD", default="")


# Static files: https://docs.djangoproject.com/en/5.1/howto/static-files/

STATIC_URL = "static/"

STATIC_ROOT = BASE_DIR / "public" / "api" / "static"


# Media files: https://docs.djangoproject.com/en/5.1/ref/settings/#media-files

MEDIA_URL = "media/"

MEDIA_ROOT = BASE_DIR / "public" / "api" / "media"


# Internationalization: https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "Africa/Nairobi"

USE_I18N = True

USE_TZ = True


# Default primary key field type: https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# ckeditor 5: https://pypi.org/project/django-ckeditor-5/

customColorPalette = [
    {"color": "hsl(4, 90%, 58%)", "label": "Red"},
    {"color": "hsl(340, 82%, 52%)", "label": "Pink"},
    {"color": "hsl(291, 64%, 42%)", "label": "Purple"},
    {"color": "hsl(262, 52%, 47%)", "label": "Deep Purple"},
    {"color": "hsl(231, 48%, 48%)", "label": "Indigo"},
    {"color": "hsl(207, 90%, 54%)", "label": "Blue"},
]


CKEDITOR_5_CONFIGS = {
    "default": {
        "toolbar": {
            "items": [
                "heading",
                "|",
                "bold",
                "italic",
                "link",
                "bulletedList",
                "numberedList",
                "blockQuote",
                "imageUpload",
                "|",
                "fontColor",
                "fontBackgroundColor",
                "|",
                "undo",
                "redo",
            ],
            "shouldNotGroupWhenFull": True,
        },
        "fontColor": {
            "colors": customColorPalette,
            "defaultColor": "hsl(0, 0%, 0%)",
        },
        "fontBackgroundColor": {
            "colors": customColorPalette,
        },
        "htmlSupport": {
            "allow": [
                {"name": ".*", "attributes": True, "classes": True, "styles": True}
            ]
        },
    },
    "extends": {
        "toolbar": {
            "items": [
                "heading",
                "|",
                "outdent",
                "indent",
                "|",
                "bold",
                "italic",
                "link",
                "underline",
                "strikethrough",
                "code",
                "subscript",
                "superscript",
                "highlight",
                "|",
                "codeBlock",
                "sourceEditing",
                "insertImage",
                "bulletedList",
                "numberedList",
                "todoList",
                "|",
                "blockQuote",
                "imageUpload",
                "|",
                "fontSize",
                "fontFamily",
                "fontColor",
                "fontBackgroundColor",
                "mediaEmbed",
                "removeFormat",
                "insertTable",
            ],
            "shouldNotGroupWhenFull": True,
        },
        "image": {
            "toolbar": [
                "imageTextAlternative",
                "|",
                "imageStyle:alignLeft",
                "imageStyle:alignRight",
                "imageStyle:alignCenter",
                "imageStyle:side",
                "|",
            ],
            "styles": [
                "full",
                "side",
                "alignLeft",
                "alignRight",
                "alignCenter",
            ],
        },
        "table": {
            "contentToolbar": [
                "tableColumn",
                "tableRow",
                "mergeTableCells",
                "tableProperties",
                "tableCellProperties",
            ],
            "tableProperties": {
                "borderColors": customColorPalette,
                "backgroundColors": customColorPalette,
            },
            "tableCellProperties": {
                "borderColors": customColorPalette,
                "backgroundColors": customColorPalette,
            },
        },
        "heading": {
            "options": [
                {
                    "model": "paragraph",
                    "title": "Paragraph",
                    "class": "ck-heading_paragraph",
                },
                {
                    "model": "heading1",
                    "view": "h1",
                    "title": "Heading 1",
                    "class": "ck-heading_heading1",
                },
                {
                    "model": "heading2",
                    "view": "h2",
                    "title": "Heading 2",
                    "class": "ck-heading_heading2",
                },
                {
                    "model": "heading3",
                    "view": "h3",
                    "title": "Heading 3",
                    "class": "ck-heading_heading3",
                },
            ]
        },
    },
    "list": {
        "properties": {
            "styles": "true",
            "startIndex": "true",
            "reversed": "true",
        }
    },
}

CKEDITOR_5_CUSTOM_CSS = "base/ckeditor5.css"
