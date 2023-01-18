from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status   
from rest_framework.decorators import api_view,authentication_classes,permission_classes
from .models import deviceInfo
from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated,DjangoModelPermissions
# from .serializers import deviceInfoSerializer
import re

# Create your views here.


#Api for getting device info, currently the IP address 
@api_view(['GET','POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def device_info(request):
    if request.method == 'GET':
        deviceOjbect = deviceInfo.objects.get(user=request.user.id)
        res = {'ip':deviceOjbect.serverIp}
        return Response(res,status=status.HTTP_200_OK)
    elif request.method == 'POST':
        if(not validIp(request.data['serverIp'])):
            res = {}
            res['error']="invalid IP"
            return Response(res,status=status.HTTP_400_BAD_REQUEST)
        try:
            deviceOjbect = deviceInfo.objects.get(user=request.user.id)
            deviceOjbect.serverIp = request.data['serverIp']
            deviceOjbect.save()
        except:
            deviceOjbect = deviceInfo()
            user = User.objects.get(id=request.user.id)
            deviceOjbect.user = user
            deviceOjbect.serverIp = request.data['serverIp']
            deviceOjbect.save()
        return Response(status=status.HTTP_202_ACCEPTED)

# returns if the given ip is valid accroding to ipv4 standard or not     
def validIp(ip):
    regex = "^((25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])\.){3}(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9]?[0-9])$"
    if(re.search(regex, ip)):
        return True
    else:
        return False
        
        

# To test if the server is running 
@api_view(['GET'])
def test(request):
    print(request.data)
    res = {'OK':'Server is Up and Running'}
    return Response(res,status=status.HTTP_200_OK)