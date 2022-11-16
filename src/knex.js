const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'bookshelf-api'
  }
})

module.exports = {
  knex
}
