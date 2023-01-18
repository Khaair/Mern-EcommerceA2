const express = require("express");
const router = express.Router();
const productCategoryModel = require("../models/category.model");

router.get("/product-category-show", async (req, res) => {
  let data = await productCategoryModel.find();
  res.send(data);
});

router.post("/product-category-add", async (req, res) => {
  const productCategoryData = new productCategoryModel({
    category: req.body.category,
  });

  try {
    const productCategoryResult = await productCategoryData.save();
    res.json({
      success: true,
      data: productCategoryResult,
    });
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-single-product-category/:id").get((req, res) => {
  productCategoryModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-product-category/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await productCategoryModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update-product-category/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await productCategoryModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        category: req.body.category,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
