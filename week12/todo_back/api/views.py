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
        data = Board.objects.create(name = request.data)
        return Response("")

class NewTask(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        board = Board.objects.get(id = request.data[4])
        task = Task.objects.create(name = request.data[0], created_at = request.data[1], due_on = request.data[2], status = request.data[3], board = board)
        return Response("task")

class BoardsView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        boards = Board.objects.all()
        serializer = BoardSerializer(boards, many=True)
        return Response()

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

    def delete(self, request, board_id):
        Board.objects.filter(id = board_id).delete()
        return Response("test")

class BoardViewTasks(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, response, board_id):
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
            if holder['id'] == task['board']:
                result.append(task)
        
        return Response(result)

class TaskView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, board_id, task_id):
        tasks = Task.objects.all()
        serializer = TaskSerializer(tasks, many=True)
        
        for task in serializer.data:
            if task_id == task['id'] and board_id == task['board']:
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