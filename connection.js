const { Pool, Client } = require('pg')
// const pool = new Pool({
//     user: 'dbuser',
//     host: 'database.server.com',
//     database: 'mydb',
//     password: 'secretpassword',
//     port: 3211,
// })
// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
// })
const client = new Client({
  user: 'pbmdb_rw',
  host: 'pgsql.hrz.tu-chemnitz.de',
  database: 'pbmdb',
  password: 'ingah4eiW',
  port: 5432,
})
client.connect()

const query = {
  // give the query a unique name
  // name: 'fetch-user',
  text: 'SELECT * from getallbaker() ',
  //values: [1],
}

client.query(query, (err, res) => {
  client.end()
  console.log(res.rows)
})

