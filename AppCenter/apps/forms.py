import re
from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError


class UserRegisterForm(forms.Form):
    email = forms.EmailField()
    username = forms.CharField(min_length=4)
    password = forms.CharField(min_length=6)
    confirm_password = forms.CharField()

    def clean(self):
        data = self.cleaned_data
        if data['confirm_password'] != data['password']:
            raise ValidationError("password not match")
        if not re.match('\w', data['username']):
            raise ValidationError("username not validate")
        if User.objects.filter(username=data['username']).exists():
            raise ValidationError("username has been taken")


class LoginForm(forms.Form):
    username = forms.CharField(min_length=4)
    password = forms.CharField(min_length=6)

    def clean(self):
        user = User.objects.get(username=self.cleaned_data['username'])
        if not user.check_password(self.cleaned_data['password']):
            raise ValidationError("user no password not validate")
