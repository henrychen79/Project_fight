module.exports = class player {
  #hp = 100;
  #bodyLength = 4;
  #attackDist = 2;
  constructor({ pid, rid, name, head, body } = {}) {
    this.playerID = pid;
    this.gameID = rid;
    this.playerName = name;
    this.head = head;
    this.body = body;
    this.attack = { type: "", point: {} };
    // set default value
    this.hp = this.#hp;
    this.curBodyLength = this.#bodyLength;
  }
  move(type) {
    if (type === "moveLeft") this.head.x = this.head.x - 1;
    else if (type === "moveRight") this.head.x = this.head.x + 1;
    else if (type === "moveUp") this.head.y = this.head.y - 3;
    else if (type === "moveDown") {
      this.head.y = this.head.y + 3;
      this.curBodyLength = this.curBodyLength - 3;
    }
  }
  setBody() {
    for (let index = 0; index < this.curBodyLength; index++) {
      if (index === 0)
        this.body[index] = { x: this.head.x, y: this.head.y + 1 };
      else his.body[index] = { x: this.head.x, y: this.body[index].y + 1 };
    }
  }
  attack(attackType) {
    this.attackEvent.type = attackType;
    this.attackEvent.area = {
      x: this.head.x + this.#attackDist,
      y: this.head.y,
    };
  }
  deductHP(attackType) {
    if (attackType === "SA") this.hp = this.hp - 5;
    if (attackType === "NA") this.hp = this.hp - 1;
  }
  static checkIsAttack(player1, player2) {
    // 檢查attack point 是否等於對手head
    if (
      player1.attack.point.x === player2.head.x &&
      player1.attack.point.y === player2.head.y
    )
      player2.deductHP(player1.attack.type);
  }
};
