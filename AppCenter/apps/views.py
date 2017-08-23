from django.shortcuts import render
from .models import App


def index(request):
    app = App.objects.first()
    return render(request, 'apps/detail.html', {'app': app})


def app_detail(request, url_slug):
    app = App.objects.get(url_slug=url_slug)
    return render(request, 'apps/detail.html', {'app': app})
