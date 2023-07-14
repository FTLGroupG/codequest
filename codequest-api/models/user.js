const { BadRequestError, UnauthorizedError } = require("../utils/errors");
const bcrypt = require("bcrypt");
const db = require("../db");

const { BCRYPT_WORK_FACTOR } = require("../config");

class User {
  /**
   * Convert a user from the database into a user object that can be viewed publically.
   * Don't show user's password
   *
   *
   * @param {User} user - user from database
   * @returns public user
   */
  static async makePublicUser(user) {
    return {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      created_at: user.created_at,
    };
  }

  static async login(credentials) {
    const requiredCredentials = ["email", "password"];
    requiredCredentials.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    const user = await User.fetchUserByEmail(credentials.email);

    if (user) {
      const isValid = await bcrypt.compare(credentials.password, user.password);
      if (isValid) {
        return User.makePublicUser(user);
      }
    }
    throw new UnauthorizedError("Invalid user credentials");
  }

  /**
   * Register user with data.
   *
   * @throws BadRequestError on duplicates.
   * @param {credentials} credentials - the user's credentials
   * @returns user
   **/
  static async register(credentials) {
    const requiredCredentials = [
      "username",
      "email",
      "password",
      "firstName",
      "lastName",
    ];
    requiredCredentials.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body`);
      }
    });

    if (credentials.email.indexOf("@") <= 0) {
      throw new BadRequestError("Invalid email");
    }

    /*
        Validating User Credentials
     */

    const existingUserWithEmail = await User.fetchUserByEmail(
      credentials.email
    );
    if (existingUserWithEmail) {
      throw new BadRequestError(`Duplicate email: ${credentials.email}`);
    }

    const existingUsername = await User.fetchUserByUsername(
      credentials.username
    );
    if (existingUsername) {
      throw new BadRequestError(`Duplicate username: ${credentials.username}`);
    }

    /*
        Encrypting password
     */
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );

    const normalizedEmail = credentials.email.toLowerCase();

    const result = await db.query(
      `INSERT INTO users(
              email,
              username,
              password,
              first_name,
              last_name
              )
              VALUES($1, $2, $3, $4, $5)
              RETURNING id, email, username, first_name, last_name, created_at;
          `,
      [
        normalizedEmail,
        credentials.username,
        hashedPassword,
        credentials.firstName,
        credentials.lastName,
      ]
    );

    const user = result.rows[0];

    return User.makePublicUser(user);
  }

  /**
   * Fetches the user witht he given email.
   * @param {email} email - the email of the requested user
   * @returns user
   */

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }

    const query = `SELECT * from users WHERE email = $1`;

    const result = await db.query(query, [email.toLowerCase()]);

    const user = result.rows[0];

    return user;
  }

  /**
   * Fetches the user with the given username
   * @param {username} username - the username of the requested user
   * @returns user
   */
  static async fetchUserByUsername(username) {
    if (!username) {
      throw new BadRequestError("No username provided");
    }

    const query = `SELECT * FROM users WHERE username = $1`;

    const result = await db.query(query, [username.toLowerCase()]);

    const userName = result.rows[0];

    return userName;
  }
}

module.exports = User;
