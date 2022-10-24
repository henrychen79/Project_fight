const router = require("express").Router();
const path = require("path");
const htmlPath = path.join(__dirname, "..", "views");
router.get("/", (req, res) => {
  //res.send("id: " + req.query.id);
  res.sendFile(htmlPath + "/fight_game.html");
});

module.exports = router;
