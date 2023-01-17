from django.apps import AppConfig


class ServerConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'server'
    def ready(self):
        from django.contrib.sessions.models import Session
        Session.objects.all().delete()
