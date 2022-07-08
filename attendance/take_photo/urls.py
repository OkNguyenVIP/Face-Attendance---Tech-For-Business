from django.urls import path
from . import views


urlpatterns = [
    path('', views.takePhoto, name='take-photo'),
    path('save-photo/', views.savePhoto, name='save-photo'),
]
