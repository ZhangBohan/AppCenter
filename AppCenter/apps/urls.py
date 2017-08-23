from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^(?P<url_slug>\w+)/', views.app_detail),
]
