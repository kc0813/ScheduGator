from django.contrib import admin

# Register your models here.
from .models import classQuery


class ClassQueryAdmin(admin.ModelAdmin):
    list_display = ("className", "noClassTime")


admin.site.register(classQuery, ClassQueryAdmin)
