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

// const url =
//   import.meta.env.VITE_WEBSOCKET_HOST || import.meta.env.DEV
//     ? "http://localhost:3000"
//     : undefined;
// const port =
//   import.meta.env.VITE_WEBSOCKET_PORT || import.meta.env.DEV ? 443 : undefined;

// export default new SocketIoService(url!, port!);
// export default new SocketIoService("http://localhost", 3000);

export default new SocketIoService(
  "wss://server-wandering-fire-1875.fly.dev",
  443
);
