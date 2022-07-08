# Generated by Django 4.0.4 on 2022-06-08 08:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enter_staff', '0004_control_informationcountdown_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='control',
            name='informationCountdown',
            field=models.CharField(choices=[('1', '1 Giây'), ('2', '2 Giây'), ('3', '3 Giây'), ('4', '4 Giây'), ('5', '5 Giây'), ('6', '6 Giây'), ('7', '7 Giây'), ('8', '8 Giây'), ('9', '9 Giây'), ('10', '10 Giây')], default='5', max_length=2),
        ),
        migrations.AlterField(
            model_name='control',
            name='photoCountdown',
            field=models.CharField(choices=[('0', '0 Giây'), ('1', '1 Giây'), ('2', '2 Giây'), ('3', '3 Giây')], default='3', max_length=1),
        ),
    ]
