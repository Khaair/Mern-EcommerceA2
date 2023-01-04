const express = require("express");
const router = express.Router();
const userPhotosModel = require("../models/userPhotosmodel");

router.get("/show-user-photo", async (req, res) => {
  let data = await userPhotosModel.find();
  res.send(data);
});

router.post("/save-user-photo", async (req, res) => {
  console.log(req.body);

  const tt = new userPhotosModel({
    username: req.body.username,
    url: req.body.url,
    userId: req.body.userId,
  });

  try {
    const a1 = await tt.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-user-single-photo/:id").get((req, res) => {
  userPhotosModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-post/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await userPhotosModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update-post/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await userPhotosModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        body: req.body.body,
        userId: req.body.userId,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
