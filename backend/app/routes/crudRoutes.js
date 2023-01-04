const express = require("express");
const router = express.Router();
const crudModel = require("../models/crud");

router.get("/show", async (req, res) => {
  let data = await crudModel.find();
  res.send(data);
});

router.post("/save", async (req, res) => {
  console.log(req.body);

  const tt = new crudModel({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
  });

  try {
    const a1 = await tt.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/showSIngle/:id").get((req, res) => {
  crudModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await crudModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await crudModel.findByIdAndUpdate(
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
