# Generated by Django 4.0.4 on 2022-06-14 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enter_staff', '0007_alter_controlcountdown_informationcountdown'),
    ]

    operations = [
        migrations.AlterField(
            model_name='controlcountdown',
            name='photoCountdown',
            field=models.CharField(choices=[('-1', 'Fast (not recommended)'), ('0', '0 Giây'), ('1', '1 Giây'), ('2', '2 Giây'), ('3', '3 Giây')], default='3', max_length=2),
        ),
    ]
