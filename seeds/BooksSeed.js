/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('books').del()
  await knex('books').insert([
    {
      id: 1,
      name: 'Penabuh Langit',
      year: '2014',
      author: 'Kamil Zaki',
      summary: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem iste quasi in commodi rerum, optio voluptates mollitia natus reiciendis facere.',
      publisher: 'Kamil Cetak',
      pageCount: 200,
      readPage: 85,
      reading: true,
      finished: false
    }
  ])
}
