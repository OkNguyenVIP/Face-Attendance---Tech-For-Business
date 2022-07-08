from django.db import models
from django.contrib.auth.models import User

import datetime


# Create your models here.


class Present(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    fullname = models.CharField(max_length=200)
    number = models.IntegerField(default=0)
    dob = models.DateField(default=datetime.date.today)

    def __str__(self):
        return "[" + str(self.user) + "] - " + str(self.fullname)


class Time(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField(default=datetime.date.today)
    time = models.DateTimeField(null=True, blank=True)
    _in = models.BooleanField(default=True)
    out = models.BooleanField(default=False)

    def __str__(self):
        return str(self.user)


class ControlCountdown(models.Model):
    PHOTO_COUNTDOWN = (
        ('0', 'Fast (not recommended)'),
        ('1', '0 Giây'),
        ('2', '1 Giây'),
        ('3', '2 Giây'),
        ('4', '3 Giây'),
    )
    photoCountdown = models.CharField(
        max_length=2, default='3', choices=PHOTO_COUNTDOWN)

    INFORMATION_COUNTDOWN = (
        ('0', '0 Giây'),
        ('1', '1 Giây'),
        ('2', '2 Giây'),
        ('3', '3 Giây'),
        ('4', '4 Giây'),
        ('5', '5 Giây'),
        ('6', '6 Giây'),
        ('7', '7 Giây'),
        ('8', '8 Giây'),
        ('9', '9 Giây'),
        ('10', '10 Giây'),
    )
    informationCountdown = models.CharField(
        max_length=2, default='5', choices=INFORMATION_COUNTDOWN)

    def __str__(self):
        return str("Photo: "
                   + self.PHOTO_COUNTDOWN[int(self.photoCountdown)][1]
                   + ", Information: "
                   + self.INFORMATION_COUNTDOWN[int(self.informationCountdown)][1])
