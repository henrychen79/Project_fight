const player = require("./game_component/player");
const express = require("express");
const app = express();
const server_port = 3000;
const http = require("http");
const server = http.createServer(app);
const Server = require("socket.io");
const io = new Server.Server(server);
app.use("/css", express.static(__dirname + "/css"));
server.listen(server_port, () => {
  console.log(`listen on ${server_port}!!!`);
});
console.log('124141241252353')
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/view/fight_game.html");
});

