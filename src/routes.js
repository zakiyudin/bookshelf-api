const {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
  getBooks
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
  {
    method: 'GET',
    path: '/books/getBook',
    handler: getBooks
  }
]

module.exports = routes
