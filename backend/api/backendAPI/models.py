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

    # The user tells us what time they don't want to have class
    # TODO change type? needa discuss with team because this one won't work as a time field
    noClassTime = models.TimeField()
