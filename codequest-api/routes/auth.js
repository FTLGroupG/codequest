const express = require("express");
const User = require("../models/user");
const Profile = require("../models/profiles");
const router = express.Router();
const { createUserJwt } = require("../utils/tokens");
const security = require("../middleware/security");

router.get("/me", security.verifyAuthUser, async (req, res, next) => {
  try {
    const { email } = res.locals.user;
    const user = await User.fetchUserByEmail(email);
    const publicUser = await User.makePublicUser(user);
    return res.status(200).json({ user: publicUser });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const user = await User.login(req.body);
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    const user = await User.register({ ...req.body, isAdmin: false });
    const token = createUserJwt(user);
    return res.status(200).json({ user, token });
  } catch (err) {
    next(err);
  }
});

router.put(
  "/userprogress/:user_profile_id/:module_id",
  async (req, res, next) => {
    try {
      const { user_profile_id, module_id } = req.params;

      console.log("user_profile_id:", user_profile_id);
      console.log("module_id:", module_id);
      await User.editUserProgress(module_id, user_profile_id);
      return res.status(201).json({});
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
