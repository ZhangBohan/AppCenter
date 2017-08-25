from django.db import models
from model_utils.models import TimeStampedModel


class App(TimeStampedModel):
    name = models.CharField('名称', max_length=255)
    url_slug = models.CharField('URL', max_length=100, db_index=True)
    description = models.CharField('描述', max_length=1024, blank=True, null=True)
    js_code = models.TextField('JS代码')
    html_code = models.TextField('HTML代码')
    css_code = models.TextField('CSS代码')
    pv = models.IntegerField('访问量', default=0)
