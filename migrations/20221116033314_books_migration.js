/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('books', (table) => {
    table.bigIncrements('id')
    table.string('name', 50).nullable()
    table.string('year', 50).nullable()
    table.string('author', 50).nullable()
    table.text('summary').nullable()
    table.string('publisher', 50).nullable()
    table.integer('pageCount').nullable()
    table.integer('readPage').nullable()
    table.boolean('reading').nullable()
    table.boolean('finished').nullable()
    table.timestamps()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('books')
}
