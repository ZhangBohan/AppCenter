# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-23 03:23
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apps', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='app',
            name='url_slug',
            field=models.CharField(default='', max_length=100, verbose_name='URL'),
            preserve_default=False,
        ),
    ]
