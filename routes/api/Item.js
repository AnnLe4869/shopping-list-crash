const mongoose = require("mongoose");
const Item = require("../../models/Item");
const authMiddleware = require("../../middleware/auth");
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
// @access private
router.post("/", authMiddleware, async (req, res) => {
  try {
    const item = await Item.create(req.body);
    res.status(200).json(item);
  } catch (err) {
    console.error(err);
  }
});

// @route DELETE api/items.:id
// @desc DELETE a specific item
// @access private
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, id: item._id });
  } catch (err) {
    console.error(err);
    res.status(200).json({ success: false });
  }
});

module.exports = router;
