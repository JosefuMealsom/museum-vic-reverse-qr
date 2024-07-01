import { Socket, io } from "socket.io-client";

class SocketIoService {
  host: string;
  port: number;
  socket?: Socket;

  constructor(host: string, port: number) {
    this.host = host;
    this.port = port;
  }

  connect() {
    this.socket = io(`${this.host}:${this.port}`);
  }

  on(messageName: string, callback: (data: any) => any) {
    this.socket?.on(messageName, (data) => {
      callback(data);
    });
  }

  setSessionId(sessionId: string) {
    this.socket?.emit("set_session_id", sessionId);
  }
}

export default new SocketIoService("127.0.0.1", 5000);
