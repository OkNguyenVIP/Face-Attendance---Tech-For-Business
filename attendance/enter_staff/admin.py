from django.contrib import admin
from .models import Time, Present, ControlCountdown

# Register your models here.


admin.site.register(Time)
admin.site.register(Present)
admin.site.register(ControlCountdown)
