const game_data_store = require("./models/game_data_store");
const game_class = require("./game_component/game");
const player_class = require("./game_component/player");
let game_data = require("./models/game_data_store");


function conn(socket, io) {
  let time
  socket.on("join-room", (player_name, room_id) => {
    if (1) {
      // console.log("check_room_exist");
      let game = game_data_store.check_room_exist(room_id);
      if (!game) {
        game = new game_class({ id: room_id });
        game_data_store.init_game_data(room_id, game);
        var player = new player_class({position:{x:0,y:0},velocity:{x:0,y:0}},player_name, room_id);
        game.add_players(player);
      }
      if (!game.check_player_exist(player_name)) {
        var player2 = new player_class(
          {position:{x:850,y:0},velocity:{x:0,y:0}},player_name, room_id
        );
        game.add_players(player2);
      }
      socket.join(room_id);
      io.sockets.to(room_id).emit("init player", game.players);
    }
  });


  socket.on("disconnect", (ev) => {
    // console.log("user disconnect:; ", ev);
    // console.log("user disconnect", socket["room"]);
    io.sockets
      .to(socket["room"])
      .emit("room-brocast", `${socket["nick"]} has leave this room`);
  });



  socket.on("player action keydown", (room_id, player_name, type) => {
    let room_num = io.sockets.adapter.rooms.get(room_id).size //該房間有幾人
    console.log('房間人測試測試測試',room_num)
    let game = game_data.get_game(room_id);
    let player = game.get_player(player_name);
    // console.log('測試測試測試測試測試測試，第0位',game.players[0])
    // console.log('測試測試測試測試測試測試，第1位',game.players[1])
    switch(type){
      case 'ArrowLeft':
        player.move_Left(type)
      break;

      case 'ArrowRight':
        player.move_Right(type)
      break;

      case 'ArrowUp':
        // player.move_Up(type)
        player.move_up2(type)
      break;

      case 'ArrowDown':
        player.move_Down(type)     
      break;
      case 'Space':
        player.attackControl()
        attack(game.players[0],game.players[1],room_num)
      break;
    }
    // console.log('keydown資料測試',player)
    io.sockets.to(room_id).emit("player action keydown", game.players);
  });



  let lock = false//此布林，放全域
  socket.on("player action keyup", (room_id, player_name, type) => {
    let time
    let game = game_data.get_game(room_id);
    let player = game.get_player(player_name);

    // function chickUp(){
    //   if(player.nojump===false&&lock===false){
    //     lock=true
    //     time=setInterval(()=>{
    //       if(player.nojump===true){
    //         clearInterval(time)
    //         lock=false
    //         player.direction=''
    //         console.log('keyup資料測試',player)
    //       }
    //       io.sockets.to(room_id).emit("player action keydown", game.players);
    //     },10)
    //   }
    // }

    switch(type){
      case 'ArrowLeft':
        type=''
        player.move_Left(type)
      break;

      case 'ArrowRight':
        type=''
        player.move_Right(type)
      break;

      case 'ArrowUp':
        player.move_up2(type)
        // if(player.position.y!=0){
        //   chickUp()
        // }
      break;

      case 'ArrowDown':
        type=''
        player.move_Down(type) 
      break;
    }
    io.sockets.to(room_id).emit("player action keyup", game.players);
  });
}

//list 設個保護
function attack(player1,player2,list){
  if(list<2){
    return
  }
  player1.weapon.position.x = player1.position.x
  player2.weapon.position.x = player2.position.x

  //玩家1 揍 玩家2 判斷
  if( ((player1.weapon.position.x+player1.width)<=(player2.position.x)) 
      &&((player2.position.x)<=(player1.weapon.position.x+player1.width*2))
      && player1.attack===true
      &&player2.position.y===0){
      player2.hp = player2.hp-5;
      // console.log('玩家1開扁')
  }

  //玩家2 揍 玩家1 判斷
  // console.log(player2.weapon.position.x-player2.width,player1.position.x+player1.width)
  // console.log(player1.position.x+player1.width,player2.position.x)

  if(((player2.weapon.position.x-player2.width)<=(player1.position.x+player1.width))
      &&((player1.position.x+player1.width)<=(player2.position.x))
      && player2.attack===true
      &&player1.position.y===0){

      player1.hp = player1.hp-5;
      // console.log('玩家2開扁')  
  }

}

module.exports.conn = conn;
