const game_data_store = require("./models/game_data_store");
const game_class = require("./game_component/game");
const player_class = require("./game_component/player");
let game_data = require("./models/game_data_store");
console.log(game_data.name);
function conn(socket, io) {
  socket.on("join-room", (player_name, room_id) => {
    console.log("socket id: ", socket.id);
    if (1) {
      console.log("check_room_exist");
      let game = game_data_store.check_room_exist(room_id);
      console.log(game);
      if (!game) {
        game = new game_class({ id: room_id });
        game_data_store.init_game_data(room_id, game);
        var player = new player_class(player_name, room_id);
        game.add_players(player);
      }
      if (!game.check_player_exist(player_name)) {
        console.log(game);
        var player = new player_class(
          player_name,
          room_id,
          {
            x: 9,
            y: 5,
            scale: 100,
          },
          "player2",
          "ArrowLeft"
        );
        game.add_players(player);
      }
      //console.log(game_data_store.player);
      socket.join(room_id);
      io.sockets.to(room_id).emit("init player", game.players);
    }
  });
  socket.on("disconnect", (ev) => {
    console.log("user disconnect:; ", ev);
    console.log("user disconnect", socket["room"]);
    io.sockets
      .to(socket["room"])
      .emit("room-brocast", `${socket["nick"]} has leave this room`);
  });
  socket.on("player action keydown", (room_id, player_name, type) => {
    console.log("send room_id: ", parseInt(room_id));
    let game = game_data.get_game(room_id);
    console.log("send game: ", game);
    let player = game.get_player(player_name);
    player.move(type);
    player.attackSpace(type);
    console.log("send player: ", player);
    io.sockets.to(room_id).emit("player action keydown", game.players);
  });
  socket.on("player action keyup", (room_id, player_name, type) => {
    console.log("send type: ", type);
    let game = game_data.get_game(room_id);
    console.log("send game: ", game);
    let player = game.get_player(player_name);
    console.log('測試',game.players[0])
    console.log('測試',game.players[1])
    let pl1=game.players[0]
    let pl2 =game.players[1]
    
    function attackTest(pl1,pl2){
      if((pl1.attackLocation_R.x)===(pl2.location.x)
          &&pl1.directionX==='ArrowRight'
          &&pl1.attack===true
          &&pl2.location.y === 5
          &&pl2.location.scale===100){
            pl2.hp=pl2.hp-10;
      }
      if((pl1.attackLocation_L.x)===(pl2.location.x)
          &&pl1.directionX==='ArrowLeft'
          &&pl1.attack===true
          &&pl2.location.y === 5
          &&pl2.location.scale===100){
            pl2.hp=pl2.hp-10;
      }
      if((pl2.attackLocation_R.x)===(pl1.location.x)
          &&pl2.directionX==='ArrowRight'
          &&pl2.attack===true
          &&pl1.location.y === 5
          &&pl1.location.scale===100){
            pl1.hp=pl1.hp-10;
      }
      if((pl2.attackLocation_L.x)===(pl1.location.x)
          &&pl2.directionX==='ArrowLeft'
          &&pl2.attack===true
          &&pl1.location.y === 5
          &&pl1.location.scale===100){
            pl1.hp=pl1.hp-10;
      }
    }  
    attackTest(pl1,pl2)

    if (type === "Space") player.attack = false;

    player.move2(type);
    //console.log("send player: ", player);
    io.sockets.to(room_id).emit("player action keyup", game.players);
  });
}
function player_process(player) {
  player.move(type);
  console.log("send player: ", player);
}
module.exports.conn = conn;
