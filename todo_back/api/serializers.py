from rest_framework import serializers
from .models import TaskList, Task

class TaskListSerializer(serializers.ModelSerializer):

    class Meta:
        model = TaskList
        fields = ("name")
        # or fields = '__all__' to return all