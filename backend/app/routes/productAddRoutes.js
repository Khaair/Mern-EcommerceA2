const express = require("express");
const router = express.Router();
const productAddModel = require("../models/productaddmodel");

router.get("/product-show", async (req, res) => {
  let data = await productAddModel.find();
  res.send(data);
});

router.post("/product-add", async (req, res) => {
  const tt = new productAddModel({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    quantity: req.body.quantity,
    url: req.body.url,
  });

  try {
    const a1 = await tt.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-single-product/:id").get((req, res) => {
  productAddModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-product/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await productAddModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update-product/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await productAddModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        url: req.body.url,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
