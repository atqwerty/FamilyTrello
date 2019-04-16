"""todo_back URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url, include   
from api import views
from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/task_lists', views.TaskListsView, basename='TaskLists')
# router.register(r'api/task_list/<int:task_list_id>', views.TaskListView, basename="TaskList")

urlpatterns = [
    path('admin/', admin.site.urls),
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace  = 'rest_framework')),
    # path('api/task_lists', views.TaskListsView.as_view()),
    path('api/task_lists/<int:task_list_id>', views.TaskListView.as_view()),
    path('api/task_lists/<int:task_list_id>/tasks', views.TaskListViewTasks.as_view()),
    path('api/task_lists/<int:task_list_id>/tasks/<int:task_id>', views.TaskView.as_view())
]

# urlpatterns = format_suffix_patterns(urlpatterns)