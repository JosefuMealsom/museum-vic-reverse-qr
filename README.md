## Reverse QR code prototype

Prototype application that uses cameras that scan qr codes on a phone to add content.

### Components

Consists of 3 components, the client which displays the QR code on the phone and also displays
all of the content that you have collected.

The QR code readers, which scan QR codes and communicate to the client via the websocket server.

The websocket server, which handles communication between the QR scanners and the client application
running on the phone.

### Setup

Client:

```bash
cd client
npm install
```

Websocket server:

```bash
cd server
npm install
```

QR code reader server:

Requires mamba/conda to be installed.

```bash
cd qr_detector
mamba env create -f environment.yaml
```

### Running the application

Run `run.bat` (currently linked to the production websocket server) or `run.dev.bat`.
`run.dev.bat` will spin up the websocket server and the client application locally.

The QR code reader also takes several arguments. Run the command `python qr_detector.py -h` to list the command
line arguments you need to pass in to run the application. They are as follows:

```bash
positional arguments:
  content_id            The content id the camera is linked to

options:
  -h, --help            show this help message and exit
  --socket_server_url SOCKET_SERVER_URL, -s SOCKET_SERVER_URL
                        The websocket server to connect to. Required
  --device-index DEVICE_INDEX, -d DEVICE_INDEX
                        The usb port the camera is connected to. Required.
  --resize_camera_input RESIZE_CAMERA_INPUT, -r RESIZE_CAMERA_INPUT
                        Input: {width},{height}. Resizes the camera feed to the specified dimensions
  --show-window, --no-show-window, -w
                        Whether to hide the open cv output window
```
