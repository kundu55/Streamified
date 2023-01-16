from django.db import models

# Create your models here.
class DirectoryType(models.Model):
    type_name = models.CharField(max_length=40)

    def __str__(self):
        return self.type_name

class Directories(models.Model):
    dir_name = models.CharField(max_length=4096,unique=True)
    dir_type = models.ForeignKey(DirectoryType,null=True,on_delete=models.CASCADE)

    def __str__(self):
        return self.dir_name
