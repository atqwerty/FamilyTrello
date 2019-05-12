from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import TaskList, Task
from .serializers import TaskListSerializer, TaskSerializer
from django.core.serializers import serialize
import json
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
# from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

# Create your views here.



class NewTaskList(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        data = TaskList.objects.create(name = request.data)
        return Response("")

class NewTask(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        task_list = TaskList.objects.get(id = request.data[4])
        task = Task.objects.create(name = request.data[0], created_at = request.data[1], due_on = request.data[2], status = request.data[3], task_list = task_list)
        return Response("task")

class TaskListsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        return Response("what")

class TaskListView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, task_list_id):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        
        for task_list in serializer.data:
            if task_list_id == task_list['id']:
                return Response(task_list)
        
        return Response("empty!")

    def post(self):
        pass

    def delete(self, request, task_list_id):
        TaskList.objects.filter(id = task_list_id).delete()
        return Response("test")

class TaskListViewTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, response, task_list_id):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        holder = ''
        result = []

        tasks = Task.objects.all()
        tasks_serializer = TaskSerializer(tasks, many=True)

        for task_list in serializer.data:
            if task_list_id == task_list['id']:
                holder = task_list

        for task in tasks_serializer.data:
            if holder['id'] == task['task_list']:
                result.append(task)
        
        return Response(result)

class TaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, task_list_id, task_id):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        
        for task in serializer.data:
            if task_id == task['id'] and task_list_id == task['task_list']:
                return Response(task)

        return Response("empty!")

    def post(self):
        pass

    def delete(self, request, task_list_id, task_id):
        Task.objects.filter(id = task_id).delete()
        return Response("a")

