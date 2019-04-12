from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskList
from .serializers import TaskListSerializer

# Create your views here.

# def index(request):
#     return HttpResponse('Welcome')

# def task_list(request):
#     return HttpResponse('a')

class TaskListView(APIView):

    def get(self):
        pass

    def post(self):
        pass