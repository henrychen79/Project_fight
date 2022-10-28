class Player {
  constructor(
    player_name,
    room_id,
    location,
    player_role,
    direction_x,
    attackLocation_R,
    attackLocation_L
  ) {
    this.name = player_name;
    this.room_id = room_id;
    (this.location = location || { x: 0, y: 5, scale: 100 }), //預設為:{x:0,y:0,scale:100}
      (this.attackLocation_R = { x: 1, y: 5 }),
      (this.attackLocation_L = { x: -1, y: 5 }),
      (this.attackPower = false);
    this.attack = false;
    this.scaleControl = false;
    this.jumpControl = true;
    this.hp=100;
    this.directionX = direction_x || "ArrowRight";
    this.directionY = null;
    this.playerRole = player_role || "player1";
    this.isWinner=false;
  }
  player_moveUp() {
    if (this.scaleControl == true) {
      return;
    }
    if (this.jumpControl) {
      this.location.x = this.location.x;
      this.location.y = this.location.y - 1;
      this.jumpControl = false;
    }
  }
  player_moveDown() {
    if (this.jumpControl != true) {
      return;
    }
    this.scaleControl = true;
    if (this.scaleControl) {
      this.location.scale = 50;
    }
  }

  player_moveLeft() {
    if (this.jumpControl != true || this.scaleControl == true) {
      return;
    }
    if (this.location.x === 0) {
      this.location.x = this.location.x;
      this.location.y = this.location.y;
    } else {
      this.location.x = this.location.x - 1;
      this.location.y = this.location.y;
    }
  }

  player_moveRight() {
    if (this.jumpControl != true || this.scaleControl == true) {
      return;
    }
    if (this.location.x === 9) {
      this.location.x = this.location.x;
      this.location.y = this.location.y;
    } else {
      this.location.x = this.location.x + 1;
      this.location.y = this.location.y;
    }
  }
  wapeMoveRight() {
    this.attackLocation_R.x = this.location.x + 1;
    this.attackLocation_R.y = this.location.y;

    this.attackLocation_L.x = this.location.x - 1;
    this.attackLocation_L.y = this.location.y;
  }
  wapeMoveLeft() {
    this.attackLocation_R.x = this.location.x + 1;
    this.attackLocation_R.y = this.attackLocation_R.y;

    this.attackLocation_L.x = this.location.x - 1;
    this.attackLocation_L.y = this.attackLocation_L.y;
  }
  player_setDirectionY(type) {
    this.directionY = type;
  }
  player_setDirectionX(type) {
    this.directionX = type;
  }
  //整個角色和武器 移動基本設定
  move(type) {
    if (type === "ArrowLeft" || type === "ArrowRight") {
      this.player_setDirectionX(type);
    }
    if (type === "ArrowUp" || type === "ArrowDown") {
      this.player_setDirectionY(type);
    }
    if (type === "ArrowUp") {
      this.player_moveUp();
    }
    if (type === "ArrowDown") {
      this.player_moveDown();
    }
    if (type === "ArrowLeft") {
      this.player_moveLeft();
      this.wapeMoveLeft();
    }
    if (type === "ArrowRight") {
      this.player_moveRight();
      this.wapeMoveRight();
    }
  }

  //對移動造成的小問題，做些設定
  player_moveUp2() {
    if (this.jumpControl != true) {
      this.location.x = this.location.x;
      this.location.y = this.location.y + 1;
      this.jumpControl = true;
    }
  }
  player_moveDown2() {
    this.scaleControl = false;
    if (this.scaleControl != true) {
      this.location.scale = 100;
    }
  }
  move2(type) {
    if (type === "ArrowDown") {
      this.player_moveDown2();
    }
    if (type === "ArrowUp") {
      this.player_moveUp2();
    }
  }
  //攻擊設定
  attackSpace(type) {
    if (type === "Space") {
      //蹲下無法攻擊
      if (type === "Space" && this.location.scale === 50) {
        return;
      }
      //跳躍狀態 無法攻擊
      if (type === "Space" && this.location.y === 4) {
        return;
      }

      //設成true，讓畫面開啟
      this.attack = true;
    }
  }
}

module.exports = Player;
