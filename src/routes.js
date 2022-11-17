const {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
  getBooks,
  insertBook
} = require('./handler')

const routes = [
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'POST',
    path: '/books',
    handler: addBooks
  },
  {
    method: 'GET',
    path: '/books/{bookId}',
    handler: getBookById
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookById
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookById
  },
  // ! menggunakan KNEX library untuk konek ke DB MYSQL
  {
    method: 'GET',
    path: '/books/getBook',
    handler: getBooks
  },
  {
    method: 'POST',
    path: '/books/postBook',
    handler: insertBook
  }
]

module.exports = routes
