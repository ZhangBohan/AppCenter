import markdown

from django.db import models
from model_utils.models import TimeStampedModel


class App(TimeStampedModel):
    name = models.CharField('名称', max_length=255)
    url_slug = models.CharField('URL', max_length=100, db_index=True)
    description = models.CharField('描述', max_length=1024, blank=True, null=True)
    js_code = models.TextField('JS代码', blank=True, null=True)
    html_code = models.TextField('HTML代码', blank=True, null=True)
    css_code = models.TextField('CSS代码', blank=True, null=True)
    readme_md = models.TextField('markdown 描述', blank=True, null=True)
    pv = models.IntegerField('访问量', default=0)

    def markdown_to_html(self):
        return markdown.markdown(self.readme_md) if self.readme_md else ''
