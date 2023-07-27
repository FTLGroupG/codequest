const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Module {
  // fetches module by their assigned id
  static async fetchModule(id) {
    const parsedId = Number.parseInt(id);
    // check for invalid param
    if (typeof parsedId !== "number" || typeof parsedId === NaN)
      throw new BadRequestError("Parameter is not a valid ID");

    const result = await db.query(
      `SELECT id, name, description, resources
    FROM modules
    WHERE id=$1`,
      [id]
    );

    if (result?.rows) {
      return result.rows[0];
    } else {
      throw new NotFoundError("No module found with provided ID");
    }
  }
}

module.exports = Module;
