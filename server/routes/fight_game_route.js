const router = require("express").Router();
const path = require("path");
const htmlPath = path.join(__dirname, "..", "views");
const game_data_store = require("../models/game_data_store");
var game_class = require("../game_component/game");
var player_class = require("../game_component/player");
router.get("/", (req, res) => {
  //res.send("id: " + req.query.id);
  console.log("Player: ", req.query.name, " Join Room:", req.query.id);
  if (!game_data_store.check_room_exist(req.query.id) || 1
  ) {
    console.log("check_room_exist");
    let game = new game_class({ id: req.query.id });
    let player = new player_class(req.query.name, req.query.id);
    game_data_store.init_game_data(req.query.id, game, player);
    console.log(game_data_store.player);
  }
  res.sendFile(htmlPath + "/fight_game.html");
});

module.exports = router;
