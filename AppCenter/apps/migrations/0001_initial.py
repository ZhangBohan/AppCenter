# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-22 15:40
from __future__ import unicode_literals

from django.db import migrations, models
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='App',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('name', models.CharField(max_length=255, verbose_name='名称')),
                ('description', models.CharField(blank=True, max_length=1024, null=True, verbose_name='描述')),
                ('js_code', models.TextField(verbose_name='JS代码')),
                ('html_code', models.TextField(verbose_name='HTML代码')),
                ('css_code', models.TextField(verbose_name='CSS代码')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
