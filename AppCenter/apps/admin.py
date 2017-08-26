from django.contrib import admin

from .models import App, Tag, AppTagShip

admin.site.register(App)
admin.site.register(Tag)
admin.site.register(AppTagShip)
