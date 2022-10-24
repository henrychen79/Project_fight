function conn(socket, io) {
  socket.on("join-room", (nickName, roomID) => {});
  socket.on("disconnect", (ev) => {
    console.log("user disconnect:; ", ev);
    console.log("user disconnect", socket["room"]);
    io.sockets
      .to(socket["room"])
      .emit("room-brocast", `${socket["nick"]} has leave this room`);
  });
  socket.on("chat message", (code) => {
    console.log("receive code: ", code);
  });
}
module.exports.conn = conn;
