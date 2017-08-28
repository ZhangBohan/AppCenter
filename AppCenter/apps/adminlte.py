# -*- coding: utf-8 -*-
# __author__ = xutao

import json
from adminlte.utils import Pager, AdminLTEBaseView, AdminMenu
from django.conf import settings
from django.contrib import messages
from django.db.models import Q
from django.forms.models import model_to_dict
from django.shortcuts import render, redirect
from .models import AppTagShip, App
from django.http.response import JsonResponse
from django.template import loader
from django.shortcuts import render, redirect

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


class AppDeleteView(AdminLTEBaseView):

    class_model = App
    _regex_name = 'app/(?P<app_id>\d+)/delete'

    def post(self, request, app_id, *args, **kwargs):
        count = App.objects.filter(id=app_id).delete()
        return JsonResponse(dict(code=0, message='OK'))


