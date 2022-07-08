# Generated by Django 4.0 on 2022-04-27 09:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('enter_staff', '0002_controls'),
    ]

    operations = [
        migrations.CreateModel(
            name='Control',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photoCountdown', models.CharField(choices=[('1', '1 Giây'), ('2', '2 Giây'), ('3', '3 Giây')], max_length=1)),
            ],
        ),
        migrations.DeleteModel(
            name='Controls',
        ),
    ]
