from django.urls import path, include
from rest_framework import routers
from knox import views as knox_views

from .api import GetTasksAPI, LoginAPI, UserAPI

router = routers.DefaultRouter()
urlpatterns = router.urls

urlpatterns.append(path('api/auth', include('knox.urls')))
urlpatterns.append(path('api/auth/login', LoginAPI.as_view()))
urlpatterns.append(path('api/auth/user', UserAPI.as_view()))
urlpatterns.append(
    path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'))


urlpatterns.append(path('api/tasks', GetTasksAPI.as_view()))
