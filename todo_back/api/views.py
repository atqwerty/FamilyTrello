from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TaskList, Task
from .serializers import TaskListSerializer, TaskSerializer

# Create your views here.

class TaskListsView(APIView):
    def get(self, request):
        task_list = TaskList.objects.all()
        serializer = TaskListSerializer(task_list, many=True)
        return Response(serializer.data)

    def post(self):
        pass

class TaskListView(APIView):
    def get(self, request, task_list_id):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        
        for task_list in serializer.data:
            if task_list_id == task_list['id']:
                return Response(task_list)
        
        return Response("empty!")

    def post(self):
        pass

class TaskListViewTasks(APIView):
    def get(self, response, task_list_id):
        task_lists = TaskList.objects.all()
        serializer = TaskListSerializer(task_lists, many=True)
        holder = ''

        tasks = Task.objects.all()
        tasks_serializer = TaskSerializer(tasks, many=True)

        for task_list in serializer.data:
            if task_list_id == task_list['id']:
                holder = task_list

        for task in tasks_serializer.data:
            if holder['id'] == task['task_list']:
                return Response(task)
                

class TaskView(APIView):
    def get(self, request):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)

    def post(self):
        pass