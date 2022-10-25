module.exports = class game {
  #defaultSize = { w: 500, h: 500 };
  #defaultCounter = 60;
  constructor({ id } = {}) {
    this.gameID = id;
    this.size = this.#defaultSize;
    this.counter = this.#defaultCounter;
    this.players = [];
  }
  getCounter() {
    return this.counter;
  }
  setCounter() {
    this.counter = this.counter + 1;
  }
};
