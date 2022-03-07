from django.urls import path
from rest_framework import routers

from .api import GetTasksAPI

router = routers.DefaultRouter()
urlpatterns = router.urls

urlpatterns.append(path('api/tasks', GetTasksAPI.as_view()))
