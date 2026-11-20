const router = require("express").Router();
const mongoose = require("mongoose");

const Item = require("../models/Item");
const Claim = require("../models/Claim");
const User = require("../models/User");

const { auth, admin } = require("../middleware/auth");

// Protect all admin routes
router.use(auth, admin);

// 1. GET ADMIN STATISTICS
router.get("/stats", async (req, res, next) => {
  try {
    const [
      users, items, lost, found, open, claims, pending
    ] = await Promise.all([
      User.countDocuments(),
      Item.countDocuments(),
      Item.countDocuments({ type: "lost" }),
      Item.countDocuments({ type: "found" }),
      Item.countDocuments({ status: "open" }),
      Claim.countDocuments(),
      Claim.countDocuments({ status: "pending" })
    ]);

    res.status(200).json({
      users,
      items,
      lost,
      found,
      open,
      claims,
      pending
    });
  } catch (error) {
    next(error);
  }
});

// 2. GET ALL CLAIMS
router.get("/claims", async (req, res, next) => {
  try {
    const claims = await Claim.find()
      .populate("item", "name status owner")
      .populate("claimant", "name email")
      .sort({ createdAt: -1 })
      .limit(100);

    res.status(200).json({ claims });
  } catch (error) {
    next(error);
  }
});

// 3. APPROVE OR REJECT CLAIM
router.patch("/claims/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body || {};

    // Validate claim ID
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        error: "Invalid claim ID"
      });
    }

    // Validate status
    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({
        error: "Status must be approved or rejected"
      });
    }

    // Only pending claims can be reviewed
    const claim = await Claim.findOneAndUpdate(
      { _id: id, status: "pending" },
      { $set: { status } },
      { new: true, runValidators: true }
    );

    if (!claim) {
      const exists = await Claim.exists({ _id: id });

      return res.status(exists ? 409 : 404).json({
        error: exists
          ? "Claim has already been reviewed"
          : "Claim not found"
      });
    }

    res.status(200).json({
      success: true,
      message: `Claim ${status} successfully`,
      claim
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;