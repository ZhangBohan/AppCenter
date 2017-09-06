from django.db.models import F
from django.shortcuts import render
from .models import App, Tag
import json


def index(request):
    sortby = request.GET.get('sortby', 'created')
    apps = App.objects.order_by('-%s' % sortby).all()
    tags = Tag.objects.filter(hot=True)
    return render(request, 'apps/index.html', {'apps': apps, "tags": tags, 'sortby': sortby})


def app_detail(request, username, url_slug):
    app = App.objects.get(url_slug=url_slug, user__username=username)
    app.pv_recently_count = app.pv
    app.pv = F('pv') + 1
    app.save()
    return render(request, 'apps/detail.html', {'app': app})


def app_code(request, username, url_slug):
    app = App.objects.get(url_slug=url_slug, user__username=username)
    return render(request, 'apps/code.html', {'app': app})


def upload_code(request):
    """
        上传应用代码
    :param request: 
    :return: 
    """
    data = json.loads(request.body)
    app_id = data.get("app_id")
    css_code = data.get("css_code")
    js_code = data.get("js_code")
    html_code = data.get("html_code")
    app_exists = App.objects.filter(id=app_id).exists()
    if not app_exists:
        raise Exception(u"app %s does not exists ..." % app_id)
    app = App.objects.get(id=app_id)
    app.html_code = html_code
    app.css_code = css_code
    app.js_code = js_code
    app.save()
    return "str"


def editor_index(request):
    """
        编辑器首页
    :param request: 
    :return: 
    """
    data = request.GET
    app_id = data.get("app_id")
    if not App.objects.filter(id=app_id).exists():
        raise Exception(u"app %s not exixts" % app_id)
    app = App.objects.get(id=app_id)
    return render(request, 'editor/index.html', {"app": app})
