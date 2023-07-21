const express = require("express");
const User = require("../models/user");
const router = express.Router();
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");

router.get("/me", security.verifyAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const userprogress = await User.getUserProgress(user.id);
    const publicUser = await User.makePublicUser(user);
    return res
      .status(200)
      .json({ user: publicUser, userprogress: userprogress });
    // view userprogress on mount
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    const userprogress = await User.getUserProgress(user.id);
    return res.status(200).json({ user, userprogress, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false });
    const userprogress = await User.createUserProgress(user.id);
    const token = createUserJwt(user);
    return res.status(200).json({ user, userprogress, token });
  } catch (err) {
    next(err);
  }
});

router.put("/userprogress/:moduleid", async (req, res, next) => {
  try {
    const { moduleid } = req.params;
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    await User.editUserProgress(moduleid, user.id);
    return res.status(201).json({});
  } catch (err) {
    next(err);
  }
});

module.exports = router;
