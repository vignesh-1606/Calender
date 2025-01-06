from django.shortcuts import render
from django.http import HttpResponse
from rest_framework import status



from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
from rest_framework.exceptions import NotFound

# Create your views here.
def index(request):
    return HttpResponse("home page")


from rest_framework.response import Response
from rest_framework.generics import GenericAPIView
from rest_framework import status 
from .serializers import TaskSerializer

class AddTaskView(GenericAPIView):
    def get_serializer_class(self):
        return TaskSerializer

    def post(self, request):
        title = request.data.get('title')
        description = request.data.get('description')
        duedate = request.data.get('duedate')
        task_status = request.data.get('status')  

        task_data = {
            'title': title,
            'description': description,
            'status': task_status,  
            'duedate': duedate,
        }
        print(task_data)

        serializer_data = TaskSerializer(data=task_data)
        print(serializer_data)
        if serializer_data.is_valid():
            serializer_data.save()
            return Response(
                {'data': serializer_data.data, 'message': 'Task added successfully'},
                status=status.HTTP_200_OK  
            )
        return Response(
            {'error': serializer_data.errors, 'message': 'Failed to add task'},
            status=status.HTTP_400_BAD_REQUEST  
        )


class ViewTaskView(GenericAPIView):
    def get_serializer_class(self):
        return TaskSerializer

    def get(self, request):
        tasks = Task.objects.all()
        if tasks.exists():
            serializer_data = TaskSerializer(tasks, many=True)
            return Response({'data': serializer_data.data}, status=status.HTTP_200_OK)
        return Response({'message': 'No tasks found'}, status=status.HTTP_204_NO_CONTENT)


class UpdateTaskView(GenericAPIView):
    def get_serializer_class(self):
        return TaskSerializer

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound(detail="Task not found")

    def put(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSerializer(task, data=request.data, partial=False) 
        if serializer.is_valid():
            serializer.save()
            return Response({'data': serializer.data, 'message': 'Task updated successfully'}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid data', 'message': 'Failed to update task'}, status=status.HTTP_400_BAD_REQUEST)


class DeleteTaskView(GenericAPIView):
    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound(detail="Task not found")

    def delete(self, request, pk):
        task = self.get_object(pk)
        task.delete()
        return Response({'message': 'Task deleted successfully'}, status=status.HTTP_204_NO_CONTENT)


class RetrieveTaskView(GenericAPIView):
    def get_serializer_class(self):
        return TaskSerializer

    def get_object(self, pk):
        try:
            return Task.objects.get(pk=pk)
        except Task.DoesNotExist:
            raise NotFound(detail="Task not found")

    def get(self, request, pk):
        task = self.get_object(pk)
        serializer = TaskSerializer(task)
        return Response({'data': serializer.data}, status=status.HTTP_200_OK)