const game_class = require("./game_component/game");
const player_class = require("./game_component/player");
const game_data_store = require("./models/game_data_store");
function conn(socket, io) {
  socket.on("join-room", (player_name, room_id) => {
    let game = game_data_store.check_room_exist(room_id);
    if (!game) {
      game = new game_class({ id: room_id });
      game_data_store.init_game_data(room_id, game);
      var player = new player_class(player_name, room_id);
      game.add_players(player);
    } else if (!game.check_player_exist(player_name)) {
      var player = new player_class(
        player_name,
        room_id,
        {
          x: 33,
          y: 5,
          scale: 100,
        },
        "player2",
        "ArrowLeft"
      );
      game.add_players(player);
    }
    socket.join(room_id);
    io.sockets.to(room_id).emit("init player", game.players);
  });
  socket.on("disconnect", (ev) => {
    console.log("user disconnect:; ", ev);
    io.sockets
      .to(socket["room"])
      .emit("room-brocast", `${socket["nick"]} has leave this room`);
  });
  socket.on("player action keydown", (type, player_name, room_id) => {
    let game = game_data_store.get_game(room_id);
    let player = game.get_player(player_name);
    console.log("type:::", type);
    player.move(type);
    io.sockets.to(room_id).emit("player action keydown", type, player);
  });
  socket.on("player action keyup", (type, player_name, room_id) => {
    let game = game_data.get_game(room_id);
    let player = game.get_player(player_name);
    if (game.players.length >= 2 && type === "Space") {
      setTimeout(() => {
        let pl1 = game.players[0];
        let pl2 = game.players[1];
        attackTest(pl1, pl2);
        player.move2(type);
        player.attack = false;
        io.sockets.to(room_id).emit("player action keyup", game.players);
        if (checkWin(pl1, pl2)) {
          io.sockets.to(room_id).emit("game over", game.players);
        }
      }, 500);
    } else if (game.players.length >= 2 && type === "KeyQ") {
      console.log("KeyQKeyQKeyQKeyQKeyQ");
      setTimeout(() => {
        let pl1 = game.players[0];
        let pl2 = game.players[1];
        attackTest20(pl1, pl2);
        player.attackLong = false;
        player.move2(type);
        io.sockets.to(room_id).emit("player action keyup", game.players);
        if (checkWin(pl1, pl2)) {
          io.sockets.to(room_id).emit("game over", game.players);
        }
      }, 2000);
    } else {
      player.move2(type);
      io.sockets.to(room_id).emit("player action keyup", game.players);
    }
  });
}

function attackTest(pl1, pl2) {
  console.log(pl1, pl2);
  if (
    pl1.attackLocation_R.x === pl2.location.x &&
    pl1.directionX === "ArrowRight" &&
    pl1.attack === true &&
    pl2.location.y === 5 &&
    pl2.location.scale === 100
  ) {
    pl2.hp = pl2.hp - 10;
  }
  if (
    pl1.attackLocation_L.x === pl2.location.x &&
    pl1.directionX === "ArrowLeft" &&
    pl1.attack === true &&
    pl2.location.y === 5 &&
    pl2.location.scale === 100
  ) {
    pl2.hp = pl2.hp - 10;
  }
  if (
    pl2.attackLocation_R.x === pl1.location.x &&
    pl2.directionX === "ArrowRight" &&
    pl2.attack === true &&
    pl1.location.y === 5 &&
    pl1.location.scale === 100
  ) {
    pl1.hp = pl1.hp - 10;
  }
  if (
    pl2.attackLocation_L.x === pl1.location.x &&
    pl2.directionX === "ArrowLeft" &&
    pl2.attack === true &&
    pl1.location.y === 5 &&
    pl1.location.scale === 100
  ) {
    pl1.hp = pl1.hp - 10;
  }
}
function attackTest20(pl1, pl2) {
  if (
    pl1.attackLocation_R.x === pl2.location.x &&
    pl1.directionX === "ArrowRight" &&
    pl1.attackLong === true &&
    pl2.location.y === 5 &&
    pl2.location.scale === 100
  ) {
    pl2.hp = pl2.hp - 50;
  }
  if (
    pl1.attackLocation_L.x === pl2.location.x &&
    pl1.directionX === "ArrowLeft" &&
    pl1.attackLong === true &&
    pl2.location.y === 5 &&
    pl2.location.scale === 100
  ) {
    pl2.hp = pl2.hp - 50;
  }
  if (
    pl2.attackLocation_R.x === pl1.location.x &&
    pl2.directionX === "ArrowRight" &&
    pl2.attackLong === true &&
    pl1.location.y === 5 &&
    pl1.location.scale === 100
  ) {
    pl1.hp = pl1.hp - 50;
  }
  if (
    pl2.attackLocation_L.x === pl1.location.x &&
    pl2.directionX === "ArrowLeft" &&
    pl2.attackLong === true &&
    pl1.location.y === 5 &&
    pl1.location.scale === 100
  ) {
    pl1.hp = pl1.hp - 50;
  }
}

//遊玩function
function checkWin(player1, player2) {
  if (player1.hp === 0 || player2.hp === 0) {
    if (player1.hp === 0) {
      player2.isWinner = true;
      // victory_msg.innerText = 'Player1勝利'
    }
    if (player2.hp === 0) {
      player1.isWinner = true;
      // victory_msg.innerText = 'Player2勝利'
    }
    return true;
  } else return false;
}

module.exports.conn = conn;
