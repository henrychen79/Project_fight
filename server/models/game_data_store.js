let instance;

class game_data {
  constructor() {
    this.game = [];
    this.player = {};
  }
  check_room_exist(room_id) {
    console.log(this.game[room_id]);
    return this.game[room_id];
  }
  init_game_data(room_id, game_obj, player_obj) {
    this.game[room_id] = game_obj;
    //this.player[player_obj.name] = player_obj;
  }
  add_player_data(player_obj) {
    this.player[player_obj.name] = player_obj;
  }
  get_game(room_id) {
    console.log("get gamme", this.game);
    return this.game[parseInt(room_id)];
  }
  get_player(playerName) {
    return this.player[playerName];
  }
  callMe() {
    console.log(`Hi! I'm ${this.game}`);
  }
}

module.exports = (() => {
  if (instance) {
    return instance;
  }

  instance = new game_data();
  return instance;
})();
