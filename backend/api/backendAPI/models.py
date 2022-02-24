from django.db import models

# Create your models here.

# class exampleForm(models.Model):
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     completed = models.BooleanField(default=False)

#     def __str__(self):
#         return self.title


class classQuery(models.Model):

    # The user queries a class via text input
    className = models.CharField(max_length=200)

    # The user tells us when they dont want to have class as a timefield
    noClassTime = models.TimeField()
