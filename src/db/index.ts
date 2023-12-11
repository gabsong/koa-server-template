import "dotenv/config";
import knex from "knex";
import log from "../common/logger";

const connection = knex({
  client: "mysql2",
  connection: process.env.DATABASE_URL,
});

async function initializeDbConnection() {
  try {
    await connection.raw("SELECT 1");
    log.info("Database connected successfully");
    return true;
  } catch (error) {
    log.error("Database connection failed:", error);
    return false;
  }
}

async function closeDbConnection() {
  await connection.destroy();
  log.info("Database connection closed.");
}

export { initializeDbConnection, closeDbConnection };
