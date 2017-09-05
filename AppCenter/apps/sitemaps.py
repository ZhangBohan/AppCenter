from django.contrib.sitemaps import Sitemap
from django.urls import reverse
from .models import App


class AppSitemap(Sitemap):
    priortity = 0.5

    def items(self):
        return App.objects.all()

    def lastmod(self, obj: App):
        return obj.modified

    def location(self, obj: App):
        return reverse('app_detail', args=(obj.url_slug,))