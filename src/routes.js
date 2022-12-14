const {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
  getBooks,
  insertBook,
  updateBook,
  getSpecificBook,
  delBook
} = require('./handler/bookHandler')

const {
  getAllUser, addUser, updateUser, deleteUser
} = require('./handler/userHandler')

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
  },
  {
    method: 'PUT',
    path: '/books/updateBook/{id}',
    handler: updateBook
  },
  {
    method: 'GET',
    path: '/books/getSpecificBook/{id}',
    handler: getSpecificBook
  },
  {
    method: 'DELETE',
    path: '/books/delBook/{id}',
    handler: delBook
  },
  {
    method: 'GET',
    path: '/users/',
    handler: getAllUser
  },
  {
    method: 'POST',
    path: '/users/',
    handler: addUser
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: updateUser
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: deleteUser
  }
]

module.exports = routes
