const express = require("express");
const router = express.Router();
const commentModel = require("../models/commentmodel");

router.get("/show-comment", async (req, res) => {
  let data = await commentModel.find();
  res.send(data);
});

router.post("/save-comment", async (req, res) => {
  console.log(req.body);

  const tt = new commentModel({
    comment: req.body.comment,
    userId: req.body.userId,
    postId: req.body.postId,
  });

  try {
    const a1 = await tt.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-single-comment/:id").get((req, res) => {
  commentModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-comment/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await commentModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await commentModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        author: req.body.author,
        body: req.body.body,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
