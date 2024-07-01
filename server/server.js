import express from "express";
import http from "http";
import { Server } from "socket.io";
import { throttle } from "underscore";

const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: clientUrl } });

io.on("connection", (client) => {
  const throttledQRDetected = throttle(
    (data) => {
      console.debug("QR code detected", data);
      io.to(data.sessionID).emit("qr_code_detected", data.contentID);
    },
    2000,
    { trailing: false }
  );

  client.on("qr_code_detected", throttledQRDetected);

  client.on("set_session_id", (data) => {
    console.debug("Setting session id: ", data);
    client.join(data);
  });

  client.on("disconnect", () => {});
});

const port = 5000;
console.info(`Server listening on port ${port}`);
server.listen(port);
