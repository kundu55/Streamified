from rest_framework import serializers
from .models import deviceInfo

class deviceInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = deviceInfo
        fields = '__all__'

    