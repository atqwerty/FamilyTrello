from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import TaskList, Task
from .serializers import TaskListSerializer, TaskSerializer

# Create your views here.

class NewTaskList(APIView):
    # def get(self, request):
    #     # data = 
    #     # task_list = TaskList.create(name)
    #     # serializer.save(task_list)
    #     # return Response(request.data)
    #     pass

    def post(self, request):
        return Response(request.data)
        # pass

class TaskListsView(viewsets.ModelViewSet):
    # def get(self, request):
    queryset = TaskList.objects.all()
    serializer_class = TaskListSerializer

    # @classmethod
    # def get_extra_actions(cls):
    #     return []
        # return Response(serializer.data)

    # def post(self):
    #     pass

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
