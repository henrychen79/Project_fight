let game_data = require("./models/game_data_store");
console.log(game_data.name);
function conn(socket, io) {
  socket.on("join-room", (player_name, room_id) => {
    socket.join(room_id);
  });
  socket.on("disconnect", (ev) => {
    console.log("user disconnect:; ", ev);
    console.log("user disconnect", socket["room"]);
    io.sockets
      .to(socket["room"])
      .emit("room-brocast", `${socket["nick"]} has leave this room`);
  });
  socket.on("player action", (room_id, player_name, type) => {
    let player = game_data.get_player(player_name);
    player.move(type);
    console.log("send player: ", player);
    io.sockets.to(room_id).emit("player action", player);
  });
}
function player_process(player) {
  player.move(type);
  console.log("send player: ", player);
}
module.exports.conn = conn;
