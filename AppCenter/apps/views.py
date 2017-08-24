from django.shortcuts import render
from .models import App


def index(request):
    apps = App.objects.all()
    return render(request, 'apps/index.html', {'apps': apps})


def app_detail(request, url_slug):
    app = App.objects.get(url_slug=url_slug)
    return render(request, 'apps/detail.html', {'app': app})


def app_code(request, url_slug):
    app = App.objects.get(url_slug=url_slug)
    return render(request, 'apps/code.html', {'app': app})
