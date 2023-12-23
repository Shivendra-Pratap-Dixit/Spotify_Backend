const router = require("express").Router();
const { Playlist } = require("../Model/playlist");
const { Song } = require("../Model/song");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  const search = req.query.search;
  if (search !== "") {
    try {
      const songs = await Song.find({ name: { $regex: search, $options: "i" } }).limit(10);
      const playlists = await Playlist.find({ name: { $regex: search, $options: "i" } }).limit(10);
      const result = { songs, playlists };
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(500).send({ message: "Internal Server Error" });
    }
  } else {
    res.status(200).send({ message: "Not Found in Database" });
  }
});

module.exports = router;



