from django.urls import path
from . import views


urlpatterns = [
    path('', views.faceAttendence, name='face-attendance'),
    path('get-pictures/', views.getPictures, name='get-pictures'),
]
