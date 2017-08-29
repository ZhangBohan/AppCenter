import markdown2

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
    pri = models.IntegerField(u"排序", default=0)
    is_valid = models.BooleanField(u"是否有效", default=True)

    def __str__(self):
        return self.name

    def markdown_to_html(self):
        return markdown2.markdown(self.readme_md, extras=['fenced-code-blocks']) if self.readme_md else ''

    class Meta:
        ordering = ("pri", )
    
    @property
    def tags(self):
        return self.apptagship_set.all()
    

class Tag(TimeStampedModel):

    name = models.CharField(u"标签名称", max_length=32)
    hot = models.BooleanField(u"是否热门", default=True, help_text=u"初期热门就简单点来。")

    def __str__(self):
        return "%s:%s" % (self.name, self.hot)


class AppTagShip(TimeStampedModel):
    """
        应用作者
    """

    app = models.ForeignKey(App, verbose_name=u"应用")
    tag = models.ForeignKey(Tag, verbose_name=u"标签")

    def __str__(self):
        return "%s:%s" % (self.app.name, self.tag.name)



