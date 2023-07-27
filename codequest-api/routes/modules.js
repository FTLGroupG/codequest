const express = require("express");
const router = express.Router();
const Module = require("../models/modules");
const security = require("../middleware/security");
const { authedUserIsProfileOwner } = require("../middleware/permissions");

router.get("/:id", security.verifyAuthUser, async (req, res, next) => {
  try {
    const id = req.params.id;

    const module = await Module.fetchModule(id);
    return res.status(200).json({
      module,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
