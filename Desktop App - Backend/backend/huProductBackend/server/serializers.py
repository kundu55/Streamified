from rest_framework import serializers
from .models import Directories, DirectoryType

class DirectorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Directories
        fields = ['pk','dir_name','dir_type']

class DirectoryTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DirectoryType
        fields = ['pk','type_name']