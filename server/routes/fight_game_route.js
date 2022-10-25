const router = require("express").Router();
const path = require("path");
const htmlPath = path.join(__dirname, "..", "views");
const game_data_store = require("../models/game_data_store");
var game_class = require("../game_component/game");
var player_class = require("../game_component/player");
router.get("/", (req, res) => {
  //res.send("id: " + req.query.id);
  console.log("Player: ", req.query.name, " Join Room:", req.query.id);
  res.sendFile(htmlPath + "/fight_game.html");
});

module.exports = router;
