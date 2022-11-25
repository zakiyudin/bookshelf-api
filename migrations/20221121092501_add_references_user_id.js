/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.alterTable('books', (table) => {
    table.bigInteger('user_id').after('id').unsigned().nullable()
    table.foreign('user_id').references('id_user').inTable('users').onDelete('cascade')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropSchemaIfExists('user_id')
}
