const Knex = require('../knex')

const getAllUser = async (request, h) => {
  const data = await Knex.knex('users')

  if (data === null) {
    const response = h.response({
      status: 'fail',
      message: 'User kosong'
    }).code(404)
    return response
  }

  const response = h.response({
    status: 'success',
    data
  }).code(200)
  return response
}

const addUser = async (request, h) => {
  const {
    // eslint-disable-next-line camelcase
    full_name,
    address,
    phone,
    isMember
  } = request.payload

  await Knex.knex('users').insert({
    // eslint-disable-next-line camelcase
    full_name,
    address,
    phone,
    isMember
  })

  const response = h.response({
    status: 'success',
    message: 'User berhasil ditambahkan'
  }).code(201)
  return response
}

module.exports = {
  getAllUser,
  addUser
}
