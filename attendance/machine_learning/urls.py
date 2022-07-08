from django.urls import path
from . import views


urlpatterns = [
    # path('', views.takePhoto, name=''),
    path('train/', views.train, name='train'),
]
