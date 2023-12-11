/* eslint-disable no-undef */
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("Example", function (table) {
    table.increments("id", { primaryKey: true });
    table.string("example").notNullable();
    table.timestamp("createdAt").defaultTo(knex.fn.now());
    table.index("createdAt");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Example");
};
