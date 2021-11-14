var express = require("express");
const LostPost = require("../models/lostPost");
var router = express.Router();

/* GET users listing. */
router.get("/", async (req, res, next) => {
  try {
    const lostPost = await LostPost.find();
    res.json(lostPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
//Post users
router.get("/:id", getLostPost, (req, res) => {
  res.json(res.lostPost);
});
router.post("/", async (req, res, next) => {
  const lostPost = new LostPost({
    publisheId: req.body.publisheId,
    state: req.body.state,
    type: req.body.type,
    Image: req.body.Image,
    Object: req.body.Object,
    place: req.body.place,
  });

  try {
    const newLost = await lostPost.save();

    res.status(201).json({ newLost });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:id", getLostPost, async (req, res) => {
  try {
    await res.lostPost.remove();
    res.json({ message: "deleted Post" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch("/:id", getLostPost, (req, res) => {
  if (req.body.publisheId != null) {
    res.lostPost.publisheId = req.body.publisheId;
  }
  if (req.body.state != null) {
    res.lostPost.state = req.body.state;
  }
  if (req.body.type != null) {
    res.lostPost.type = req.body.type;
  }
  if (req.body.Object != null) {
    res.lostPost.Object = req.body.Object;
  }
  if (req.body.place != null) {
    res.lostPost.place = req.body.place;
  }
  if (req.body.Image != null) {
    res.lostPost.Image = req.body.Image;
  }
  try {
    res.lostPost.save().then((updatedPost) => {
      res.json(updatedPost);
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

async function getLostPost(req, res, next) {
  try {
    lostPost = await LostPost.findById(req.params.id);
    if (lostPost == null) {
      return res.status(404).json({ message: "cannot find Lost" });
    }
  } catch (error) {
    return res.status(500).json({ message: err.message });
  }
  res.lostPost = lostPost;
  next();
}

module.exports = router;
