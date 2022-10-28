const game_data_store = require("./models/game_data_store");
const game_class = require("./game_component/game");
const player_class = require("./game_component/player");
let game_data = require("./models/game_data_store");


function conn(socket, io) {
  let time
  socket.on("join-room", (player_name, room_id) => {
    if (1) {
      console.log("check_room_exist");
      let game = game_data_store.check_room_exist(room_id);
      if (!game) {
        game = new game_class({ id: room_id });
        game_data_store.init_game_data(room_id, game);
        var player = new player_class({position:{x:0,y:0},velocity:{x:0,y:0}},player_name, room_id);
        game.add_players(player);
      }
      if (!game.check_player_exist(player_name)) {
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
    let game = game_data.get_game(room_id);
    let player = game.get_player(player_name);
    if(type ==='ArrowLeft'){
        if(player.position.y!=0){
          return
      }
      player.direction='ArrowLeft'
      player.velocity.x=-5
      
    }

    if(type ==='ArrowRight'){
      if(player.position.y!=0){
        return
      }
      player.direction='ArrowRight'
      player.velocity.x=5
    }

    if(type ==='ArrowUp'){
      player.direction='ArrowUp'
      player.velocity.y=5
      
    }
    function test(){
      if((player.direction==='ArrowUp'||player.direction==='')&&player.position.y===0&&player.nojump===false){
          time = setInterval(()=>{
              player.move(type)
              player.revise_move(type)
              io.sockets.to(room_id).emit("player action keydown", game.players);
              if(player.position.y===0&&player.nojump===true){
                  console.log('有我嗎')
                  clearInterval(time)
              }
          },10)
      }
    }

    player.move(type)
    test()
    io.sockets.to(room_id).emit("player action keydown", game.players);
  });




  socket.on("player action keyup", (room_id, player_name, type) => {
    
    let game = game_data.get_game(room_id);
    let player = game.get_player(player_name);

    if(type ==='ArrowLeft'){
      player.velocity.x=0
    }

    if(type ==='ArrowRight'){
      player.velocity.x=0
    }

    if(type ==='ArrowUp'){
      player.direction=''
      
    }

    function test(){
      if((player.direction==='ArrowUp'||player.direction==='')&&player.position.y===0&&player.nojump===false){
        console.log('123332',player.direction,player.position.y,player.nojump)
          time = setInterval(()=>{
              player.move(type)
              player.revise_move(type)
              io.sockets.to(room_id).emit("player action keydown", game.players);
              if(player.position.y===0&&player.nojump===true){
                  console.log('有我嗎')
                  clearInterval(time)
              }
          },10)
      }
    }
    
    test(player,room_id,game.players)
    io.sockets.to(room_id).emit("player action keyup", game.players);
  
  });
}

module.exports.conn = conn;
