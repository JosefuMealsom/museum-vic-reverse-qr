import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (client) => {
  client.on("qr_code_detected", (data) => {
    io.emit("qr_code_detected", data);
  });

  client.on("disconnect", () => {});
});

server.listen(5000);
