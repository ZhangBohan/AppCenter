FROM python:3.6
MAINTAINER BohanZhnag <bohanzhang@foxmail.com>

ENV PYTHONUNBUFFERED 1

RUN mkdir /code
WORKDIR /code

COPY requirements.txt /code/requirements.txt
RUN pip install -r requirements.txt -i http://mirrors.aliyun.com/pypi/simple/ --trusted-host mirrors.aliyun.com
COPY ./AppCenter/ /code/
