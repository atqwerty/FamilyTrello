from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, viewsets
from .models import Board, Task, Family
from .serializers import BoardSerializer, TaskSerializer, FamilySerializer
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



class NewBoard(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # data = Board.objects.create(name = request.data, board_id = reques)
        return Response(request.data)

class NewTask(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        boardd = Board.objects.get(id = request.data[4])
        task = Task.objects.create(name = request.data[0], created_at = request.data[1], due_on = request.data[2], status = request.data[3], task_list_id = request.data[4])
        return Response("task")

class BoardsView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, family_id):
        data = Board.objects.create(name = request.data, board_id = family_id)
        return Response("Task List Created")

    def get(self, request, family_id):
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        result = []

        for board in serializer.data:
            if family_id == board['board']:
                result.append(board)
        return Response(result)

    def delete(self, request, board_id, family_id):
        Board.objects.filter(id = board_id).delete()
        return Response("Family deleted")

class BoardView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, board_id):
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        
        for board in serializer.data:
            if board_id == board['id']:
                return Response(board)
        
        return Response("empty!")

    def post(self):
        pass

    def delete(self, request, task_list_id):
        Board.objects.filter(id = task_list_id).delete()
        return Response("Task List Deleted")

class BoardViewTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, response, board_id, family_id):
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        holder = ''
        result = []

        tasks = Task.objects.all()
        tasks_serializer = TaskSerializer(tasks, many=True)

        for board in serializer.data:
            if board_id == board['id']:
                holder = board

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

    def delete(self, request, board_id, task_id):
        Task.objects.filter(id = task_id).delete()
        return Response("a")

class FamilyView(APIView):
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        family = Family.objects.create(name = request.data)
        return Response("family created")

    def get(self, request):
        family = Family.objects.all()
        serializer = FamilySerializer(family, many=True)
        return Response(serializer.data)

    def delete(self, request, family_id):
        Family.objects.filter(id = family_id).delete()
        return Response("test")