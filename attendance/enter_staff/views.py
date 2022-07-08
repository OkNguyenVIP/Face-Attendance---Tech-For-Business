from django.http import HttpResponse
from django.shortcuts import render
from django.contrib.auth.forms import UserCreationForm
from django.views.decorators.csrf import csrf_exempt

from .models import Present, Time
import datetime
from django.contrib.auth.models import User


# from django.contrib.auth.decorators import login_required


# Create your views here.


def enterStaff(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'enter_staff/index.html', {'username': request.POST['username']})
    else:
        form = UserCreationForm()
    return render(request, 'enter_staff/register.html', {'form': form})


def addInformation(request):
    if request.method == 'POST':
        user = User.objects.get(username=request.POST['username'])

        present = Present(user=user,
                          fullname=request.POST['fullname'],
                          number=request.POST['number'],
                          dob=request.POST['dob'])
        present.save()

        openWebcam = "open"
    return render(request, 'take_photo/index.html', {'username': request.POST['username'], "openWebcam": "open"})
