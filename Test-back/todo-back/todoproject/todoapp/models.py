from django.db import models


# Create your models here.
class Task(models.Model): 
      title=models.CharField(max_length=50)
      description=models.CharField(max_length=100)
      duedate=models.CharField(max_length=10)
      status=models.CharField(max_length=30)
