from rest_framework import serializers
from .models import classQuery


class ClassQuerySerializer(serializers.ModelSerializer):
    class Meta:
        model = classQuery
        fields = ("className", "noClassTime")
