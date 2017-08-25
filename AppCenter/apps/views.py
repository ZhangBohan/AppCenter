from django.db.models import F
from django.shortcuts import render
from .models import App


def index(request):
    apps = App.objects.order_by('-modified').all()
    return render(request, 'apps/index.html', {'apps': apps})


def app_detail(request, url_slug):
    app = App.objects.get(url_slug=url_slug)
    app.pv_recently_count = app.pv
    app.pv = F('pv') + 1
    app.save()
    return render(request, 'apps/detail.html', {'app': app})


def app_code(request, url_slug):
    app = App.objects.get(url_slug=url_slug)
    return render(request, 'apps/code.html', {'app': app})
