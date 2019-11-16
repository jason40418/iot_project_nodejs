from SocketIO import SocketIO
from threading import Timer, Event, Thread

if __name__ == "__main__":
    heartbeat = SocketIO(debug=True)
    data = {'msg': 'connect', 'version': '1', 'support': ['1', 'pre2', 'pre1']}
    heartbeat.sendMsg("front-end-publish", data)