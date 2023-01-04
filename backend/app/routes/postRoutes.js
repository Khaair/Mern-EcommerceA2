const express = require("express");
const router = express.Router();
const postModel = require("../models/postmodel");

router.get("/showposts", async (req, res) => {
  let data = await postModel.find();
  res.send(data);
});

router.post("/savepost", async (req, res) => {
  console.log(req.body);

  const tt = new postModel({
    title: req.body.title,
    body: req.body.body,
    userId: req.body.userId,
    postTime: req.body.postTime,
  });

  try {
    const a1 = await tt.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-single-post/:id").get((req, res) => {
  postModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-post/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await postModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update-post/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await postModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
        postTime: req.body.postTime,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
