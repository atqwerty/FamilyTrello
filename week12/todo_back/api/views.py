from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import TaskList, Task
from .serializers import TaskListSerializer, TaskSerializer
from django.core.serializers import serialize

# Create your views here.

class NewTaskList(APIView):
    def post(self, request):
        data = TaskList.objects.create(name = request.data)
        return Response("")

class NewTask(APIView):
    def post(self, request):
        # data = Task.objects.create(name = request.data.get("name"), 
            # created_at = request.data["created_at"], due_to = request.data.get("due_to"), status = request.data.get("status"))
        return Response(request.data)

class TaskListsView(viewsets.ModelViewSet):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer

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
    def get(self, request, task_list_id, task_id):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        
        for task in serializer.data:
            if task_id == task['id'] and task_list_id == task['task_list']:
                return Response(task)

        return Response("empty!")

    def post(self):
        pass
