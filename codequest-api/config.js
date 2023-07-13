// Enables loading environment variables from .env file
require("dotenv").config();

// Enables adding colors to console
require("colors");

const PORT = process.env.PORT ? Number(process.env.PORT) : 3001;
const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "test";
const IS_TESTING = (process.env.NODE_ENV = "test" ? true : false);

// Fetch Secrey key in .ENV and store it
const SECRET_KEY = process.env.SECRET_KEY || "CHANGE_THIS_KEY";

// Use develoepr DB, testing DB or production DB

function getDatabaseUri() {
  const dbUser = process.env.DATABASE_USER || "postgres";
  const dbPass = process.env.DATABASE_PASS
    ? encodeURI(process.env.DATABASE_PASS)
    : "postgres";
  const dbHost = process.env.DATABASE_HOST || "localhost";
  const dbPort = process.env.DATABASE_PORT || 5432;
  const dbTestName = process.env.DATABASE_TEST_NAME || "codequest_test";
  const dbProdName = process.env.DATABASENAME || "codequest";
  const dbName = process.env.NODE_ENV === "test" ? dbTestname : dbProdName;

  return (
    process.env.DATABASE_URL ||
    `postgresql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`
  );
}

const BCRYPT_WORK_FACTOR = IS_TESTING ? 1 : 13;

console.log("Codequest Config:".red);
console.log("PORT:".blue, PORT);
console.log("Database URI:".blue, getDatabaseUri());
console.log("------".yellow);

module.exports = {
  PORT,
  getDatabaseUri,
  BCRYPT_WORK_FACTOR,
  IS_TESTING,
  SECRET_KEY,
};
