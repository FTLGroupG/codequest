const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");
const User = require("../models/user");
const bcrypt = require("bcrypt");

class Profile {
  // fetching profiles by user email
  static async fetch(email) {
    const result = await db.query(
      `SELECT id, first_name 
            FROM user_profiles
            WHERE user_email=$1
            ORDER BY id DESC`,
      [email]
    );

    return result.rows;
  }

  // fetches profile by their assigned id
  static async fetchById(id) {
    const parsedId = Number.parseInt(id);
    // check for invalid param
    if (typeof parsedId !== "number" || typeof parsedId === NaN)
      throw new BadRequestError("Parameter is not a valid ID");

    const result = await db.query(
      `SELECT id, first_name, user_email AS "userEmail" 
    FROM user_profiles 
    WHERE id=$1`,
      [id]
    );

    if (result?.rows) {
      return result.rows[0];
    } else {
      throw new NotFoundError("No user profiles found with provided ID");
    }
  }

  // creates user profile
  static async create(email, data) {
    const requiredFields = ["firstName"];
    const stringFields = ["firstName"];
    requiredFields.forEach((field) => {
      if (!data.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field}!`);
      }
    });

    stringFields.forEach((field) => {
      if (data[field].length <= 0) {
        throw new BadRequestError(`Missing ${field}`);
      }
    });

    const result = await db.query(
      `INSERT INTO user_profiles (
                first_name,
                user_email
            )
            VALUES ($1,$2)
            RETURNING id, first_name, user_email;`,
      [data.firstName, email]
    );

    return result.rows[0];
  }

  // Removes a user profile by ID
  static async remove(id, credentials, email) {
    const parsedId = Number.parseInt(id);
    const user = await User.fetchUserByEmail(email);
    console.log("here 3");
    // Check for invalid param
    if (typeof parsedId !== "number" || Number.isNaN(parsedId)) {
      throw new BadRequestError("Parameter is not a valid ID");
    }

    console.log("here 2");
    if (!credentials) {
      throw new BadRequestError(`Missing password in request body`);
    }

    console.log("here 1");

    const isValid = await bcrypt.compare(credentials, user.password);
    if (isValid) {
      console.log("is Valid");
      // Check if the profile with the given ID exists
      const existingProfile = await db.query(
        `SELECT id FROM user_profiles WHERE id=$1`,
        [parsedId]
      );

      if (existingProfile.rows.length === 0) {
        throw new NotFoundError("No user profile found with provided ID");
      }

      // If the profile exists, delete it
      await db.query(`DELETE FROM userprogress WHERE user_profile_id=$1`, [
        parsedId,
      ]);
      await db.query(`DELETE FROM user_profiles WHERE id=$1`, [parsedId]);
    } else {
      throw new UnauthorizedError("Invalid user credentials");
    }
  }
}

module.exports = Profile;
