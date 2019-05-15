from rest_framework import serializers
from .models import Board, Task, Family

class BoardSerializer(serializers.ModelSerializer):

    # name = serializers.CharField(required=True, allow_blank=False, max_length=200)

    class Meta:
        model = Board
        fields = '__all__'

    # def create(self, validated_data):
    #     return Board.objects.create(**validated_data)

    # def destroy(self, request, *args, **kwargs):
    #    user = request.id # deleting user
    #    # you custom logic # 
    #    return super(YourViewSetClass, self).destroy(request, *args, **kwargs)

class FamilySerializer(serializers.ModelSerializer):
    class Meta:
        model = Family
        fields = '__all__'

class TaskSerializer(serializers.ModelSerializer):
    
    Board = BoardSerializer
    class Meta:
        model = Task
        fields = '__all__'