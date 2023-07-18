const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Question {
  // fetching questions by modules
  static async fetch(module_id) {
    const result = await db.query(
      `SELECT id, question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type
            FROM questions 
            WHERE module_id=$1
            ORDER BY id DESC`,
      [module_id]
    );

    return result.rows;
  }

  // fetches question by their assigned id
  static async fetchById(id) {
    const parsedId = Number.parseInt(id);
    // check for invalid param
    if (typeof parsedId !== "number" || typeof parsedId === NaN)
      throw new BadRequestError("Parameter is not a valid ID");

    const result = await db.query(
      `SELECT id, question, answer, incorrect_answers, question_spanish, answer_spanish, incorrect_answers_spanish, module_id AS "module_id" 
    FROM questions 
    WHERE id=$1`,
      [id]
    );

    if (result?.rows) {
      return result.rows[0];
    } else {
      throw new NotFoundError("No question items found with provided ID");
    }
  }

  // creates question
  //   static async create(module, data) {
  //     const requiredFields = [
  //       "question",
  //       "answer",
  //       "question_spanish",
  //       "answer_spanish",
  //       "module_id",
  //     ];

  //     const stringFields = [
  //       "question",
  //       "answer",
  //       "question_spanish",
  //       "answer_spanish",
  //     ];
  //     requiredFields.forEach((field) => {
  //       if (!data.hasOwnProperty(field)) {
  //         throw new BadRequestError(`Missing ${field}!`);
  //       }
  //     });

  //     if (data.module_id <= 0) {
  //       throw new BadRequestError(`Module Id can't be 0`);
  //     }

  //     const result = await db.query(
  //       `INSERT INTO questions (
  //                 question,
  //                 answer,
  //                 question_spanish,
  //                 answer_spanish,
  //                 module_id
  //             )
  //             VALUES ($1,$2,$3,$4,$5)
  //             RETURNING id, question, answer, question_spanish, answer_spanish, module_id;`,
  //       [
  //         data.question,
  //         data.answer,
  //         data.question_spanish,
  //         data.answer_spanish,
  //         Number(data.module_id),
  //       ]
  //     );

  //     return result.rows[0];
  //   }
}

module.exports = Question;
