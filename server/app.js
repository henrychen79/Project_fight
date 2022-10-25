const express = require("express");
const app = express();
const server_port = 3000;
const http = require("http");
const server = http.createServer(app);
const Server = require("socket.io");
const io = new Server.Server(server);
// init game data store.
const game_data = require("./models/game_data_store");
// init game route.
const game_route = require("./routes/fight_game_route");
const game_socket_handler = require("./game_socket_handler");
app.use("/css", express.static(__dirname + "/css"));
server.listen(server_port, () => {
  console.log(`listen on ${server_port}!!!`);
});
app.use("/game", game_route);
io.on("connection", (socket) => {
  game_socket_handler.conn(socket, io);
});
