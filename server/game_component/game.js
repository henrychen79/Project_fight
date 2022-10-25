module.exports = class game {
  #defaultSize = { w: 500, h: 500 };
  #defaultCounter = 60;
  constructor({ id } = {}) {
    this.gameID = id;
    this.size = this.#defaultSize;
    this.counter = this.#defaultCounter;
    this.players = [];
  }
  add_players(player) {
    this.players.push(player);
  }
  getCounter() {
    return this.counter;
  }
  setCounter() {
    this.counter = this.counter + 1;
  }
  check_player_exist(player_name) {
    console.log("players:: ", this.players);
    var test = this.players.some((player) => {
      console.log("playe:: ", player.name, player_name);
      return player.name === player_name;
    });
    console.log("test:: ", test);
    return test;
  }
  get_player(player_name) {
    return this.players.find((element) => element.name === player_name);
  }
};
