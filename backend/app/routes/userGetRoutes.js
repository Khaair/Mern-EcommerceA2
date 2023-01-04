const express = require("express");
const router = express.Router();
const userGetModel = require("../models/user.model");

router.get("/showusers", async (req, res) => {
  let data = await userGetModel.find();
  res.send(data);
});

router.post("/savepost", async (req, res) => {
  console.log(req.body);

  const tt = new userGetModel({
    title: req.body.title,
    body: req.body.body,
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
router.route("/show-single-user/:id").get((req, res) => {
  userGetModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await userGetModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await userGetModel.findByIdAndUpdate(
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
