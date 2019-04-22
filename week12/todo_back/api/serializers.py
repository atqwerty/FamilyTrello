from rest_framework import serializers
from .models import TaskList, Task

class TaskListSerializer(serializers.Serializer):

    name = serializers.CharField(required=True, allow_blank=False, max_length=200)

    class Meta:
        model = TaskList
        fields = '__all__'

    def create(self, validated_data):
        return TaskList.objects.create(**validated_data)

    # def destroy(self, request, *args, **kwargs):
    #    user = request.id # deleting user
    #    # you custom logic # 
    #    return super(YourViewSetClass, self).destroy(request, *args, **kwargs)

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'