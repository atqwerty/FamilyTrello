from django.db import models

# Create your models here.

class TaskList(models.Model):
    name = models.CharField(max_length = 200)

    @classmethod
    def create(cls, name):
        task_list = cls(name = name)
        return task_list

class Task(models.Model):
    name = models.CharField(max_length = 200)
    created_at = models.DateTimeField('date created at')
    due_on = models.DateTimeField('date due on')
    status = models.CharField(max_length = 200)
    task_list = models.ForeignKey(TaskList, on_delete=models.CASCADE)