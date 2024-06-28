import cv2
import numpy
from pyzbar.pyzbar import decode
import socketio

video_stream = cv2.VideoCapture(0)
sio = socketio.SimpleClient()

sio.connect('ws://localhost:5000', transports=['websocket'])

while True:
    success, frame = video_stream.read()

    #frame = cv2.resize(frame, (512, 512))
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
            sio.emit("qr_code_detected", code.data.decode("ascii"))
    except:
        print("An error occured with the detection")

    cv2.imshow("QR code reader", frame)

    key =  cv2.waitKey(1)
    if key == 27:
        break

video_stream.release()