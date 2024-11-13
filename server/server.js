const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const port = process.env.PORT || 3000;

// HTTP server not HTTPS 
// todo make it HTTPS
const server = http.createServer(app);

// Socket.IO setting
const io = new Server(server, {
  cors: {
    origin: [
      "https://localhost",
      "https://192.168.10.101"
    ],
    methods: ["GET", "POST"]
  }
});

// send index.html
app.use(express.static("public"));

// response for get
app.get("/api", (req, res) => {
  res.send({ message: "Hello from HTTP endpoint!" });
});

// Socket.IO
io.on("connection", (socket) => {
  console.log("new client connected");

  socket.on("message", (data) => {
    console.log("receive a message:", data);
    socket.broadcast.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

// Run the server
server.listen(port, () => {
  console.log(`server running ${port} `);
});
