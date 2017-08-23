from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^apps/(?P<url_slug>\w+)/code/', views.app_code, name='app_code'),
    url(r'^apps/(?P<url_slug>\w+)/', views.app_detail, name='app_detail'),
]
