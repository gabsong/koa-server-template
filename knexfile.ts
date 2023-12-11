// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
// eslint-disable-next-line no-undef
export = {
  client: "mysql2",
  connection: process.env.DATABASE_URL,
};
