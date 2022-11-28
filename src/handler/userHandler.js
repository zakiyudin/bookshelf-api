/* eslint-disable camelcase */
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

  if (full_name === undefined || full_name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Nama user tidak boleh kosong'
    }).code(400)
    return response
  }

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

const updateUser = async (request, h) => {
  const { id } = request.params

  const {
    full_name,
    address,
    phone,
    isMember
  } = request.payload

  const idCheck = await Knex.knex('users').where('id_user', '=', id)
  console.log(idCheck.length)
  if (idCheck.length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'id tidak ditemukan'
    }).code(404)
    return response
  }

  if (full_name === undefined || full_name === '') {
    const response = h.response({
      status: 'fail',
      message: 'Nama user tidak boleh kosong'
    }).code(400)

    return response
  }

  await Knex.knex('users').where('id_user', id).update({
    full_name,
    address,
    phone,
    isMember
  })

  const response = h.response({
    status: 'success',
    message: 'User berhasil diperbarui'
  }).code(201)
  return response
}

const deleteUser = async (request, h) => {
  const { id } = request.params

  const idCheck = await Knex.knex('users').where('id_user', '=', id)
  // console.log(idCheck.length)
  if (idCheck.length === 0) {
    const response = h.response({
      status: 'fail',
      message: 'id tidak ditemukan'
    }).code(404)
    return response
  }

  await Knex.knex('users').where('id_user', id).del()

  const response = h.response({
    status: 'success',
    message: 'User berhasil dihapus'
  }).code(200)
  return response
}

module.exports = {
  getAllUser,
  addUser,
  updateUser,
  deleteUser
}
