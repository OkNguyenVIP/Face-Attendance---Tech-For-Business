from django.urls import path
from . import views


urlpatterns = [
    path('', views.enterStaff, name='enter-staff'),
    path('add-information/', views.addInformation, name='add-information'),
]
