# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-09-06 03:59
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0008_app_is_valid'),
    ]

    operations = [
        migrations.AddField(
            model_name='app',
            name='ext_source',
            field=models.TextField(blank=True, null=True, verbose_name='额外资源'),
        ),
    ]
