from django.contrib import admin
from django.urls import path,include
from . import views
urlpatterns = [
    path('',views.index),
    path('addtask', views.AddTaskView.as_view(), name='add-task'),
    path('viewtask', views.ViewTaskView.as_view(), name='view-task'),
    path('updatetask/<int:pk>/', views.UpdateTaskView.as_view(), name='update-task'),
    path('deletetask/<int:pk>/', views.DeleteTaskView.as_view(), name='delete-task'),
     path('task/<int:pk>/', views.RetrieveTaskView.as_view(), name='retrieve-task'),
]
