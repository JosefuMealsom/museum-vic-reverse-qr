from flask import Flask, render_template
from flask_socketio import SocketIO, emit
    
app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.event
def qr_code_detected(message):
    emit('code_scanned', message, broadcast=True)

@socketio.event
def connect(sid):
    print('connect', sid)

if __name__ == '__main__':
    socketio.run(app)