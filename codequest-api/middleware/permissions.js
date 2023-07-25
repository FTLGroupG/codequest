const express = require("express");
const Profile = require("../models/profiles");
const { ForbiddenError } = require("../utils/errors");

const router = express.Router();

const authedUserIsProfileOwner = async (req, res, next) => {
  try {
    const { user } = res.locals;

    const id = req.params.id;

    const profile = await Profile.fetchById(id);

    if (profile.userEmail !== user.email) {
      throw new ForbiddenError(
        "Permission error: You are not authorized to see this profile!"
      );
    }

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authedUserIsProfileOwner,
};
