/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      full_name: 'Zakiyudin Kamil Fikri',
      address: 'Mojosari - Mojokerto',
      phone: '085961463178',
      isMember: false
    }
  ])
}
