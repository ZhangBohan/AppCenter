# -*- coding: utf-8 -*-
# __author__ = xutao

import json
from adminlte.utils import Pager, AdminLTEBaseView, AdminMenu
from django.conf import settings
from django.contrib import messages
from django.db.models import Q
from django.forms.models import model_to_dict
from django.shortcuts import render, redirect
from .models import AppTagShip, App, Tag
from django.http.response import JsonResponse
from django.template import loader
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect

app_menu = AdminMenu("应用管理", icon_classes="fa fa-shopping-bag", sort=8000)


class AppView(AdminLTEBaseView):

    menu = AdminMenu(name="App列表", parent_menu=app_menu, sort=8196)

    def get(self, request, *args, **kwargs):
        q = request.GET.get('q')
        query = App.objects.filter(is_valid=True)
        if q:
            query = query.filter(Q(name__icontains=q) | Q(url_slug__icontains=q))
        pager = Pager.from_request(query, request)
        return render(request, 'adminlte/app_list.html', context={
            "pager": pager,
        })


class AppCreateView(AdminLTEBaseView):

    menu = AdminMenu(name="添加App", parent_menu=app_menu, sort=8197)

    def get(self, request, *args, **kwargs):
        return render(request, 'adminlte/add.html', context={})

    def post(self, request, *args, **kwargs):
        data = request.POST
        app_name = data.get("name")
        url_slug = data.get("url_slug")
        desc = data.get("description")
        if App.objects.filter(user__username=request.user.username, url_slug=url_slug).exists():
            messages.add_message(request, messages.ERROR, u"url路径不能重复，请重新填写URL")
            return redirect(AppCreateView.view_name())
        tags = data.get("tags")
        app = App(name=app_name, url_slug=url_slug, description=desc, user_id=request.user.id)
        app.save()
        tag_list = tags.split(" ")
        for tag in tag_list:
            tag, created = Tag.objects.get_or_create(name=tag)
            app_tag_ship = AppTagShip(app_id=app.id, tag_id=tag.id)
            app_tag_ship.save()
        return HttpResponseRedirect('/editor/?app_id=%s' % app.id)


class AppDeleteView(AdminLTEBaseView):

    class_model = App
    _regex_name = 'app/(?P<app_id>\d+)/delete'

    def post(self, request, app_id, *args, **kwargs):
        count = App.objects.filter(id=app_id).delete()
        return JsonResponse(dict(code=0, message='OK'))


