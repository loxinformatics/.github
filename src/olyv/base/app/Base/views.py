from django.middleware.csrf import get_token
from rest_framework import response, status, viewsets
from rest_framework.decorators import action

from .models import Base


class BaseViewSet(viewsets.ViewSet):
    def list(self, request):
        base = Base.objects.first()

        if not base:
            return response.Response(
                {"detail": "No base data available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "csrf_token": get_token(request),
            "full_name": base.full_name,
            "short_name": base.short_name,
            "motto_description": base.motto_description,
            "primary_color": base.primary_color,
            "colored_logo_full_image": request.build_absolute_uri(
                base.colored_logo_full_image.url
            )
            if base.colored_logo_full_image
            else None,
            "colored_logo_mini_image": request.build_absolute_uri(
                base.colored_logo_mini_image.url
            )
            if base.colored_logo_mini_image
            else None,
            "light_logo_full_image": request.build_absolute_uri(
                base.light_logo_full_image.url
            )
            if base.light_logo_full_image
            else None,
            "light_logo_mini_image": request.build_absolute_uri(
                base.light_logo_mini_image.url
            )
            if base.light_logo_mini_image
            else None,
            "dark_logo_full_image": request.build_absolute_uri(
                base.dark_logo_full_image.url
            )
            if base.dark_logo_full_image
            else None,
            "dark_logo_mini_image": request.build_absolute_uri(
                base.dark_logo_mini_image.url
            )
            if base.dark_logo_mini_image
            else None,
            # Add contact fields directly
            "primary_phone": base.primary_phone,
            "secondary_phone": base.secondary_phone,
            "primary_email": base.primary_email,
            "secondary_email": base.secondary_email,
            "city_name": base.city_name,
            "PO_box": base.PO_box,
            "street_address": base.street_address,
            "social_media_links_version": base.social_media_links_version,
            "facebook_URL": base.facebook_URL,
            "instagram_URL": base.instagram_URL,
            "X_URL": base.X_URL,
            "linkedin_URL": base.linkedin_URL,
            "spotify_URL": base.spotify_URL,
        }

        return response.Response(data)

    @action(detail=False, methods=["get"])
    def metadata(self, request):
        base = Base.objects.first()

        if not base:
            return response.Response(
                {"detail": "No base data available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "full_name": base.full_name,
            "motto_description": base.motto_description,
            "website_URL": base.website_URL,
            "favicon_image": request.build_absolute_uri(base.favicon_image.url)
            if base.favicon_image
            else None,
            "apple_image": request.build_absolute_uri(base.apple_image.url)
            if base.apple_image
            else None,
            "og_image": request.build_absolute_uri(base.og_image.url)
            if base.og_image
            else None,
            "X_image": request.build_absolute_uri(base.X_image.url)
            if base.X_image
            else None,
        }

        return response.Response(data)

    @action(detail=False, methods=["get"])
    def manifest(self, request):
        base = Base.objects.first()

        if not base:
            return response.Response(
                {"detail": "No base data available."},
                status=status.HTTP_404_NOT_FOUND,
            )

        data = {
            "full_name": base.full_name,
            "short_name": base.short_name,
            "motto_description": base.motto_description,
            "pwa_192_image": request.build_absolute_uri(base.pwa_192_image.url)
            if base.pwa_192_image
            else None,
            "pwa_512_image": request.build_absolute_uri(base.pwa_512_image.url)
            if base.pwa_512_image
            else None,
            "apple_image": request.build_absolute_uri(base.apple_image.url)
            if base.apple_image
            else None,
        }
        return response.Response(data)
