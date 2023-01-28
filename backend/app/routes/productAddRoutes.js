const express = require("express");
const router = express.Router();
const productAddModel = require("../models/productaddmodel");
const { check, validationResult } = require("express-validator");

// Get All information
router.get("/product-show", async (req, res) => {
  try {
    let data = await productAddModel.find();
    res.send(data);
  } catch (err) {
    res.status(500).send({ msg: "Error retrieving data" });
  }
});

// Post information
router.post(
  "/product-add",
  [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    check("price").not().isEmpty().withMessage("Price is required"),
    check("category").not().isEmpty().withMessage("Category is required"),
    check("quantity").not().isEmpty().withMessage("Quantity is required"),
    check("url").not().isEmpty().withMessage("url is required"),
  ],

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const productAddData = new productAddModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        quantity: req.body.quantity,
        url: req.body.url,
      });
      const savedData = await productAddData.save();
      res.status(200).json({
        data: savedData,
        status: "200",
        message: "Message saved successfully",
      });
    } catch (err) {
      res.status(500).send({ msg: "Error saving data" });
    }
  }
);

// Get Single information
router.route("/show-single-product/:id").get(async (req, res, next) => {
  try {
    let data = await productAddModel.findById(req.params.id);
    if (!data) {
      return res.status(404).send({ msg: "Data not found" });
    }
    res.json(data);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({ msg: "Data not found" });
    }
    return res.status(500).send({ msg: "Error retrieving data" });
  }
});

// Delete information
router.delete("/delete-product/:id", async (req, res) => {
  try {
    let data = await productAddModel.deleteOne({ _id: req.params.id });
    if (!data) {
      return res.status(404).send({ msg: "Data not found" });
    }
    res.send({ msg: "deleted", data: data });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({ msg: "Data not found" });
    }
    return res.status(500).send({ msg: "Error deleting data" });
  }
});

// Update information
router.post(
  "/update-product/:id",
  [
    check("title").not().isEmpty().withMessage("Title is required"),
    check("description").not().isEmpty().withMessage("Description is required"),
    check("price").not().isEmpty().withMessage("Price is required"),
    check("category").not().isEmpty().withMessage("Category is required"),
    check("quantity").not().isEmpty().withMessage("Quantity is required"),
    check("url").not().isEmpty().withMessage("url is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let updatedData = await productAddModel.findByIdAndUpdate(
        { _id: req.params.id },
        {
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          category: req.body.category,
          quantity: req.body.quantity,
          url: req.body.url,
        },
        { new: true }
      );
      if (!updatedData) {
        return res.status(404).send({ msg: "Data not found" });
      }
      res.send({ info: "updated", ResponseUpdatedData: updatedData });
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.status(404).send({ msg: "Data not found" });
      }
      return res.status(500).send({ msg: "Error updating data" });
    }
  }
);

module.exports = router;
