const books = require('./books')
const { nanoid } = require('nanoid')
const Knex = require('./knex')

// * trying get all books using Knex library query builder
const getBooks = async (request, h) => {
  const data = await Knex.knex.select('*').from('books')
  if (data.length === 0) {
    const response = h.response({
      status: 'failed',
      message: 'Books are null'
    })
    response.code(404)
    return response
  }

  const response = h.response({
    status: 'success',
    data: {
      books: data
    }
  })

  response.code(200)
  return response
}

const insertBook = async (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const timestamp = Date.now()

  const finished = readPage === pageCount

  // ! nama == null
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
    response.code(400)
    return response
  }

  // ! halaman yang dibaca melebihi jumlah halaman
  if (pageCount <= readPage) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    }).code(400)
    return response
  }

  const emptyName = await Knex.knex('books').where('name', name).select('name')
  // console.log(emptyName.length <= 1)

  if (emptyName.length >= 1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Nama buku sudah ada'
    }).code(400)

    return response
  }

  const data = await Knex.knex('books').insert({
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    finished,
    created_at: timestamp
  })

  const response = h.response({
    status: 'success',
    message: 'Data saved successfully',
    data
  })
  response.code(201)
  return response
}

const getAllBooks = (request, h) => {
  const { reading, name, finished } = request.query

  // * [OPTIONAL]
  if (finished) {
    // console.log(finished)
    const filterFinished = books.filter(book => book.finished === true)
    const response = h.response({
      status: 'success',
      data: {
        books: filterFinished.map(result => ({
          id: result.id,
          name: result.name,
          publisher: result.publisher
        }))
      }
    })

    response.code(200)
    return response
  }

  // * [OPTIONAL]
  if (name) {
    // console.log(name.toLowerCase())
    const filterName = books.filter(book => book.name === name.toLowerCase())
    const response = h.response({
      status: 'success',
      data: {
        books: filterName.map(result => ({
          id: result.id,
          name: result.name,
          publisher: result.publisher
        }))
      }
    })
    response.code(200)
    return response
  }

  // * [OPTIONAL]
  if (reading) {
    // console.log(reading)
    const readingTrue = reading === true
    const filterReading = books.filter(book => book.reading === readingTrue)
    const response = h.response({
      status: 'success',
      data: {
        books: filterReading.map(result => ({
          id: result.id,
          name: result.name,
          publisher: result.publisher
        }))
      }
    })
    response.code(200)
    return response
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map(result => ({
        id: result.id,
        name: result.name,
        publisher: result.publisher
      }))
    }
  })
  response.code(200)
  return response
}

const addBooks = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const id = nanoid()
  const finished = pageCount === readPage
  const insertedAt = new Date().toISOString()
  const updatedAt = insertedAt

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt
  }

  // console.log(name)
  /**
   * ! validasi ketika nama buku tidak diisi
   */
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })

    response.code(400)
    return response
  }

  /**
   * ! validasi ketika membaca buku melebihi halaman buku itu sendiri
   */
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })

    response.code(400)
    return response
  }

  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id)

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id
      }
    })

    response.code(201)
    return response
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan'
  })

  response.code(500)
  return response
}

const getBookById = (request, h) => {
  const { bookId } = request.params
  // console.log(bookId)

  // const book = books.filter((value) => value.bookId === bookId)[0]
  const book = books.find((value) => {
    // console.log(value)
    return value.id === bookId
  })

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book
      }
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan'
  })

  response.code(404)
  return response
}

const editBookById = (request, h) => {
  const { id } = request.params
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading
  } = request.payload

  const updatedAt = new Date().toISOString()

  /**
   * ! validasi ketika nama buku tidak diisi
   */
  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })

    response.code(400)
    return response
  }

  /**
   * ! validasi ketika membaca buku melebihi halaman buku itu sendiri
   */
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })

    response.code(400)
    return response
  }

  const book = books.findIndex((value) => value.id === id)

  // console.log(book)
  if (book !== -1) {
    books[book] = {
      ...books[book],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt
    }
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        books
      }
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan'
  })

  response.code(404)
  return response
}

const deleteBookById = (request, h) => {
  const { id } = request.params

  const book = books.findIndex((value) => value.id === id)

  if (book !== -1) {
    books.splice(book, 1)
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus'
    })

    response.code(200)
    return response
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan'
  })

  response.code(404)
  return response
}

module.exports = {
  getAllBooks,
  addBooks,
  getBookById,
  editBookById,
  deleteBookById,
  getBooks,
  insertBook
}
