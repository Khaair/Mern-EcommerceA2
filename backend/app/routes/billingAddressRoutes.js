const express = require("express");
const router = express.Router();
const billingAddressModel = require("../models/billingaddressmodel");

router.get("/billing-address-show", async (req, res) => {
  let data = await billingAddressModel.find();
  res.send(data);
});

router.post("/billing-address-add", async (req, res) => {
  const tt = new billingAddressModel({
    fullname: req.body.fullname,
    address: req.body.address,
    city: req.body.city,
    postcode: req.body.postcode,
    email: req.body.email,
    phone: req.body.phone,
    cart: req.body.cart,
    subtotal: req.body.subtotal,
    total: req.body.total,
    ordernumber: req.body.ordernumber,
    date: req.body.date,
  });

  try {
    const a1 = await tt.save();
    res.json(a1);
  } catch (err) {
    res.send("Error");
  }
});

// Get Single information
router.route("/show-single-billing-address/:id").get((req, res) => {
  billingAddressModel.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
});

router.delete("/delete-billing-address/:id", async (req, res) => {
  console.log(req.params.id);
  let data = await billingAddressModel.deleteOne({ _id: req.params.id });
  res.send({ msg: "deleted", data: data });
});

router.post("/update-billing-address/:id", async (req, res) => {
  console.log(req.params.id, req.body);

  try {
    let updatee = await billingAddressModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fullname: req.body.fullname,
        address: req.body.address,
        city: req.body.city,
        postcode: req.body.postcode,
        email: req.body.email,
        phone: req.body.phone,
        cart: req.body.cart,
        subtotal: req.body.subtotal,
        total: req.body.total,
        ordernumber: req.body.ordernumber,
        date: req.body.date,
      }
    );

    res.send({ info: "updated", up: updatee });
  } catch (err) {
    res.send({ info: "error ocuured" });
  }
});

module.exports = router;
