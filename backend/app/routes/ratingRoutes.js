const express = require("express");
const router = express.Router();
const productRatingModel = require("../models/rating.model");

router.get("/product-rating-show", async (req, res) => {
  let data = await productRatingModel.find();
  res.send(data);
});

router.post("/product-rating-add", async (req, res) => {
  const productRatingData = new productRatingModel({
    userId: req.body.userId,
    productId: req.body.productId,
    ratingValue: req.body.ratingValue,
  });

  try {
    const productRatingResult = await productRatingData.save();
    res.json({
      success: true,
      data: productRatingResult,
    });
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-single-product-rating/:id").get((req, res) => {
  productRatingModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-product-rating/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await productRatingModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update-product-rating/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await productRatingModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        userId: req.body.userId,
        productId: req.body.productId,
        ratingValue: req.body.ratingValue,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
