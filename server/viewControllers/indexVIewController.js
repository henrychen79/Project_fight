const socket = io();
const urlParams = new URLSearchParams(window.location.search);
const player_name = urlParams.get("name");
const room_id = urlParams.get("id");
let curpPlayerIdx = 0;
socket.emit("join-room", player_name, room_id);
socket.on("init player", function (player_list) {
  console.log("init player", player_list);
  for (let index = 0; index < player_list.length; index++) {
    let player = player_list[index];
    if (player.name === player_name) curpPlayerIdx = index;
    initialize(index, player);
  }
});
let el_players = [];
let el_stage = document.querySelector(".stage");
function initialize(index, player) {
  if (!el_players[index]) {
    let el_player = document.createElement("div");
    el_stage.append(el_player);
    el_players.push(el_player);
    if (player.playerRole === "player1") {
      el_player.classList.add("ken", "stance");
      el_player.style.left = player.location.x * 10 + "px";
    } else {
      el_player.classList.add("ken", "stance", "flip");
      el_player.style.left = player.location.x * 10 + "px";
    }
  }
}
var $ken = $(".ken");
var $kenPos, $fireballPos;
var punch = function () {
  $ken.addClass("punch");
  setTimeout(function () {
    $ken.removeClass("punch");
  }, 150);
};
var kick = function () {
  $ken.addClass("kick");
  setTimeout(function () {
    $ken.removeClass("kick");
  }, 500);
};
var rkick = function () {
  $ken.addClass("reversekick");
  setTimeout(function () {
    $ken.removeClass("reversekick");
  }, 500);
};
var tatsumaki = function () {
  $ken.addClass("tatsumaki");
  setTimeout(function () {
    $ken.addClass("down");
  }, 1500);
  setTimeout(function () {
    $ken.removeClass("tatsumaki down");
  }, 2000);
};
var hadoken = function () {
  $ken.addClass("hadoken");
  setTimeout(function () {
    $ken.removeClass("hadoken");
  }, 500);
  setTimeout(function () {
    var $fireball = $("<div/>", { class: "fireball" });
    $fireball.appendTo($ken);

    var isFireballColision = function () {
      return $fireballPos.left + 75 > $(window).width() ? true : false;
    };

    var explodeIfColision = setInterval(function () {
      $fireballPos = $fireball.offset();
      //console.log('fireballInterval:',$fireballPos.left);

      if (isFireballColision()) {
        $fireball
          .addClass("explode")
          .removeClass("moving")
          .css("marginLeft", "+=22px");
        clearInterval(explodeIfColision);
        setTimeout(function () {
          $fireball.remove();
        }, 500);
      }
    }, 50);

    setTimeout(function () {
      $fireball.addClass("moving");
    }, 20);

    setTimeout(function () {
      $fireball.remove();
      clearInterval(explodeIfColision);
    }, 3020);
  }, 250);
};
var shoryuken = function () {
  $ken.addClass("shoryuken");
  setTimeout(function () {
    $ken.addClass("down");
  }, 500);
  setTimeout(function () {
    $ken.removeClass("shoryuken down");
  }, 1000);
};
var jump = function (player) {
  let el_player;
  if (player.playerRole === "player1") el_player = el_players[0];
  else el_player = el_players[1];
  el_player.classList.add("jump");
  setTimeout(function () {
    el_player.classList.add("down");
  }, 500);
  setTimeout(function () {
    el_player.classList.remove("jump", "down");
  }, 1000);
};
var kneel = function () {
  $ken.addClass("kneel");
};
var walkLeft = function (player) {
  let el_player;
  if (player.playerRole === "player1") el_player = el_players[0];
  else el_player = el_players[1];
  el_player.classList.add("walk");
  el_player.style.left = player.location.x * 10 + "px";
  //$ken.addClass("walk").css({ marginLeft: "-=10px" });
};
var walkRight = function (player) {
  let el_player;
  if (player.playerRole === "player1") el_player = el_players[0];
  else el_player = el_players[1];
  el_player.classList.add("walk");
  el_player.style.left = player.location.x * 10 + "px";
  //$ken.addClass("walk").css({ marginLeft: "+=10px" });
};
var removeWalk = function (player) {
  if (player.playerRole === "player1") {
    let el_player = el_players[0];
    el_player.classList.remove("walk");
  }
};
var socket_emit_keydown = function (e, player_name, room_id) {
  socket.emit("player action keydown", e.key, player_name, room_id);
};
// on click events
$("#a").click(punch);
$("#z").click(kick);
$("#e").click(rkick);
$("#q").click(tatsumaki);
$("#s").click(hadoken);
$("#d").click(shoryuken);
$("#up").click(jump);
$("#down").on("mousedown mouseup", function (e) {
  if (e.type == "mousedown") {
    kneel();
  } else {
    $ken.removeClass("kneel");
  }
});
$("#left").on("mousedown mouseup", function (e) {
  if (e.type == "mousedown") {
    walkLeft();
  } else {
    $ken.removeClass("walk");
  }
});
$("#right").on("mousedown mouseup", function (e) {
  if (e.type == "mousedown") {
    walkRight();
  } else {
    $ken.removeClass("walk");
  }
});

var hasClass = function (element, classes) {
  classes.forEach(function (value, index, array) {
    if (element.classList.contains(value)) return true;
  });
  return false;
};

// on keydown events
$(document).on("keydown keyup", function (e) {
  let emit_flag = false;
  if (e.type == "keydown") {
    // s - hadoken
    if (
      e.keyCode == 83 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "punch",
        "kick",
        "reversekick",
      ])
    ) {
      //hadoken();
      emit_flag = true;
    }

    // d - shoryuken
    if (
      e.keyCode == 68 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "punch",
        "kick",
        "reversekick",
        "jump",
      ])
    ) {
      //shoryuken();
      emit_flag = true;
    }

    // q - tatsumaki senpuu kyaku
    if (
      e.keyCode == 81 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "punch",
        "kick",
        "reversekick",
        "jump",
      ])
    ) {
      //tatsumaki();
      emit_flag = true;
    }

    // a - punch
    if (
      e.keyCode == 65 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "punch",
      ])
    ) {
      //punch();
      emit_flag = true;
      //socket_emit_keydown(e, player_name, room_id);
    }

    // e - kick
    if (
      e.keyCode == 90 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "kick",
      ])
    ) {
      //kick();
      emit_flag = true;
    }

    // r - reverse kick
    if (
      e.keyCode == 69 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "kick",
        "reversekick",
      ])
    ) {
      //rkick();
      emit_flag = true;
    }

    // up - jump
    if (
      e.keyCode == 38 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "kick",
        "reversekick",
        "jump",
      ])
    ) {
      //jump();
      //socket_emit_keydown(e, player_name, room_id);
      emit_flag = true;
    }

    // down - kneel
    if (
      e.keyCode == 40 &&
      !hasClass(el_players[curpPlayerIdx], [
        "tatsumaki",
        "shoryuken",
        "hadoken",
        "kick",
        "reversekick",
        "jump",
        "kneel",
      ])
    ) {
      //kneel();
      emit_flag = true;
    }
    // ← flip
    //if (e.keyCode == 37) $ken.addClass('flip');
    // → unflip
    //if (e.keyCode == 39) $ken.removeClass('flip');
    // ←← →→ walking
    if (e.keyCode == 37) emit_flag = true;
    if (e.keyCode == 39) emit_flag = true;
    if (emit_flag) socket_emit_keydown(e, player_name, room_id);
  } else {
    // keyup
    socket.emit("player action up", e.key, player_name, room_id);
    //$ken.removeClass("walk kneel");
  }
  //return false;
});

socket.on("player action keydown", function (action, player) {
  console.log("player action keydown ", action, player);
  if (action === "ArrowLeft") {
    walkLeft(player);
  }
  if (action === "ArrowRight") {
    walkRight(player);
  }
  if (action === "ArrowUp") {
    jump(player);
  }
});
socket.on("player action keyup", function (action, player) {
  removeWalk(player);
});
