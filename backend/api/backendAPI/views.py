from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
from .serializers import ClassQuerySerializer
from .models import classQuery

# Create your views here.


class classQueryView(viewsets.ModelViewSet):
    serializer_class = ClassQuerySerializer
    queryset = classQuery.objects.all()
