const express = require("express");
const router = express.Router();
const Question = require("../models/questions");
const security = require("../middleware/security");

router.get("/id/:id", security.verifyAuthUser, async (req, res, next) => {
  try {
    const id = req.params.id;

    const question = await Question.fetchById(id);

    return res.status(200).json({
      ...question,
    });
  } catch (error) {
    next(error);
  }
});

//retrieves questions
router.get("/:id", async (req, res, next) => {
  try {
    const module_id = req.params.id;

    const questions = await Question.fetch(module_id);

    return res.status(200).json({
      questions,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
