from django.urls import path
from server import views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Folder Sharing API",
      default_version='v1',
      description="CRUD ops on Directories alongwith server start & stop",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@xyz.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    path("directory/", views.DirectoryList.as_view()),
    path("directory/<int:pk>", views.DirectoryDetail.as_view()),
    path("directoryType/", views.DirectoryTypeList.as_view()),
    path("directoryType/<int:pk>", views.DirectoryTypeDetail.as_view()),
    path("serveDirectory/<int:pk>",views.ServerUrl.as_view()),
    path("directoryContent/<int:pk>",views.DirectoryContent.as_view()),
    path('serverClose/',views.CloseUrl.as_view()),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui')
]