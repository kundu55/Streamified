# Generated by Django 4.1.3 on 2022-12-04 18:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('deviceIp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='deviceinfo',
            name='serverIp',
            field=models.CharField(blank=True, max_length=15),
        ),
    ]