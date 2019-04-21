from rest_framework import serializers
from .models import TaskList, Task

class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskList
        fields = '__all__'

    def create(self, validated_data):
        return TaskList.objects.create(**validated_data)

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'