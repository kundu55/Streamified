from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from http.server import SimpleHTTPRequestHandler, HTTPServer
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from .models import Directories, DirectoryType
from .serializers import DirectorySerializer, DirectoryTypeSerializer
from .serverthread import *
import socket
import ctypes
import shutil
import os

# Create your views here.

# Rest views

class DirectoryList(generics.ListCreateAPIView):
    queryset = Directories.objects.all()
    serializer_class = DirectorySerializer

    #Get path first, add thumbnails dir, add dir path to db, create thumbnails
            
    def post(self, request):
        dir_path = request.data["dir_name"]
        new_path = dir_path+'/Thumbnails'
        if not os.path.exists(new_path):
            os.makedirs(new_path)
        # Directories(dir_name = dir_path).save()
        serilizer = DirectorySerializer(data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            os.chdir(dir_path)
            os.system('for f in *.mp4; do ffmpeg -i "$f" -ss 00:00:00.000 -vframes 1 "Thumbnails/${f%.mp4}.jpg"; done')
        
            return Response({'Dir added with thumbnails'}, status=status.HTTP_200_OK)
        return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)

class DirectoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Directories.objects.all()
    serializer_class = DirectorySerializer
    def delete(self,request,pk):
        try:
            directory = Directories.objects.get(pk=pk)
        except Directories.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        #First the thumbnails are deleted, then the dir is removed

        dir_path = directory.dir_name
        dir_path = dir_path+'/Thumbnails'
        shutil.rmtree(dir_path, ignore_errors=True)
        Directories.objects.filter(pk=pk).delete()
        return Response({'Delete successful! Thumbnails also deleted'},status=status.HTTP_200_OK)

    def put(self,request,pk):
        try:
            directory = Directories.objects.get(pk=pk)
        except Directories.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        #Remove thumbnails of old dir, create new ones, update the dir

        dir_path = directory.dir_name
        dir_path = dir_path+'/Thumbnails'
        shutil.rmtree(dir_path, ignore_errors=True)

        dir_new_path = request.data["dir_name"]
        new_path = dir_new_path+'/Thumbnails'
        if not os.path.exists(new_path):
         os.makedirs(new_path)
        os.chdir(dir_new_path)
        os.system('for f in *.mp4; do ffmpeg -i "$f" -ss 00:00:00.000 -vframes 1 "Thumbnails/${f%.mp4}.jpg"; done')
        # Directories.objects.filter(pk=pk).update(dir_name = dir_new_path)
        serilizer = DirectorySerializer(directory,data=request.data)
        if serilizer.is_valid():
            serilizer.save()
            return Response({'Successfully updated directory with thumbnails'}, status=status.HTTP_200_OK)
        return Response(serilizer.errors, status=status.HTTP_400_BAD_REQUEST)


class ServerUrl(GenericAPIView):
    serializer_class = DirectorySerializer
    def get(self,request,pk):
        try:
            directory = Directories.objects.get(pk=pk)
        except Directories.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        response = serveDirectory(request,directory.dir_name)
        return Response(response,status=status.HTTP_200_OK)

class DirectoryContent(GenericAPIView):
    def get(self,request,pk):
        try:
            directory = Directories.objects.get(pk=pk)
        except Directories.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        response = directoryContent(directory.dir_name)
        return Response(response,status=status.HTTP_200_OK)

class CloseUrl(GenericAPIView):
    serializer_class = DirectorySerializer
    def get(self,request):
        response = closeServer(request)
        if('success' in response):
            return Response(response,status=status.HTTP_200_OK)
        return Response(response,status=status.HTTP_404_NOT_FOUND)

class DirectoryTypeList(generics.ListCreateAPIView):
    queryset = DirectoryType.objects.all()
    serializer_class = DirectoryTypeSerializer

class DirectoryTypeDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = DirectoryType.objects.all()
    serializer_class = DirectoryTypeSerializer

#HTTP server and related views
# finds and returns an empty port
def emptyPort():
    sock = socket.socket()
    sock.bind(('',0))
    return sock.getsockname()[1]

def serveDirectory(request,DIRECTORY= '/home/vaishsharma/Pictures/test'): 
    # checking if server is already running for current user, if it is running than
    # it has to be closed first than the new server will be started
    closeServer(request)

    # Socket package is used to find the Host IP address, 
    # use ifconfig in terminal to find the same
    # connect() for UDP doesn't send packets
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.connect(("8.8.8.8", 80)) 
    HOST = s.getsockname()[0]
    
    PORT = emptyPort()

    class Handler(SimpleHTTPRequestHandler):
        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs,directory= DIRECTORY)
            # Creating Handler class to get a particualr directory

        def end_headers(self):
            self.send_my_headers()

            SimpleHTTPRequestHandler.end_headers(self)

        def send_my_headers(self):
            self.send_header("Access-Control-Allow-Origin", "*")

    server = HTTPServer((HOST,PORT), Handler)    
    # creating simple http server object
    print("starting server")
    threadServer(server).start()
    # starting the server thread, and passing server object

    request.session['server'] = id(server)
    # storing server object id in default django session

    response = {'serverip':HOST+":"+str(PORT)}
    return response 

def closeServer(request):
    server_id = request.session.get('server')
    print(server_id)
    if(server_id):
        server = ctypes.cast(server_id, ctypes.py_object).value
    else:
        return {'not-found':'server is not running'}
    # getting server object id from session and 
    # retrieving server object using ctypes for closing the server.
    server.server_close()
    request.session['server'] = None
    print("server closed")
    response = {'success':'server closed'}
    return response



def directoryContent(DIRECTORY):
    content = os.listdir(DIRECTORY)
    for i in range(len(content)):
        content[i] = [content[i],content[i].replace(" ","%20")]
    response = {'directoryContent':content}
    return response