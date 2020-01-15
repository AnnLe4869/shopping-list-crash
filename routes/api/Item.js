const mongoose = require("mongoose");
const Item = require("../../models/Item");
const router = require("express").Router();

// @route GET api/items
// @desc GET all item
// @access public
router.get("/", async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (err) {
    console.error(err);
  }
});

// @route POST api/items
// @desc POST all item
// @access public
router.post("/", async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
  }
});

// @route DELETE api/items.:id
// @desc DELETE a specific item
// @access public
router.delete("/:id", async (req, res) => {
  try {
    const item = await Item.findOneAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false });
  }
});

module.exports = router;
