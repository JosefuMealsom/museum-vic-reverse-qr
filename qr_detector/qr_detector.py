import cv2
import numpy
from pyzbar.pyzbar import decode
import socketio
import argparse

def get_resized_dimensions(resized):
    components = resized.split(",")
    if len(components) != 2:
        raise argparse.ArgumentTypeError("Incorrect number of arguments. Format is {width},{height}.")
    return (int(components[0]), int(components[1]))

parser = argparse.ArgumentParser("qr_detector")
parser.add_argument("content_id", help="The content id the camera is linked to", type=int)
parser.add_argument("--resize_camera_input","-r",  help="Input: {width},{height}. Resizes the camera feed to the specified dimensions", type=get_resized_dimensions)
parser.add_argument("--socket_server_url","-s",  help="The websocket server to connect to", default='wss://server-wandering-fire-1875.fly.dev')
parser.add_argument("--device-index","-d",  help="The usb port the camera is connected to", default=0, type=int)
parser.add_argument("--show-window","-w",  help="Whether to hide the open cv output window", action=argparse.BooleanOptionalAction)

args = parser.parse_args()
content_id = args.content_id
dimensions = args.resize_camera_input
socket_server_url = args.socket_server_url
device_index = args.device_index
show_window = args.show_window

video_stream = cv2.VideoCapture(device_index)

sio = socketio.SimpleClient()
sio.connect(socket_server_url, transports=['websocket'])

while True:
    success, frame = video_stream.read()

    if dimensions != None:
        frame = cv2.resize(frame, dimensions)

    if not success:
        continue
    #frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    #frame = cv2.threshold(frame, 50, 255, cv2.THRESH_BINARY)[1]

    try:
        qr_code_detector = cv2.QRCodeDetector()
        detections = decode(frame)

        decoded_info, points, straight_qrcode = qr_code_detector.detectAndDecode(frame)

        for code in detections:
            points = numpy.array([[code.polygon[0].x, code.polygon[0].y],
                                [code.polygon[1].x, code.polygon[1].y],
                                [code.polygon[2].x, code.polygon[2].y],
                                [code.polygon[3].x, code.polygon[3].y]], numpy.int32)
            points = points.reshape((-1,1,2))
            frame = cv2.polylines(frame, [points], True, (0, 255, 0), 5)
            sio.emit("qr_code_detected", {"sessionID":code.data.decode("ascii"), "contentID": content_id})
    except:
        print("An error occured with the detection")
    
    if show_window:
        cv2.imshow("QR code reader", frame)
        key =  cv2.waitKey(1)
        if key == 27:
            break
    

video_stream.release()
