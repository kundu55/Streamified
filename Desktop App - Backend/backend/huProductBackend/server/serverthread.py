import threading
from http.server import SimpleHTTPRequestHandler, HTTPServer


class threadServer(threading.Thread):
    def __init__(self,server):
        self.server = server
        threading.Thread.__init__(self)

    def run(self):
        #It takes the server object from views and runs it into a separate thread
        self.server.serve_forever()