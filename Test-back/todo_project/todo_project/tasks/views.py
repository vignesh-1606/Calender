from django.shortcuts import render

from rest_framework import status, viewsets
from rest_framework.response import Response
from .models import Task
from .serializers import TaskSerializer

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    
    def perform_create(self, serializer):
        # Handle task creation logic
        serializer.save()

    def perform_update(self, serializer):
        # Handle task update logic
        serializer.save()

    def perform_destroy(self, instance):
        # Handle task deletion logic
        instance.delete()

