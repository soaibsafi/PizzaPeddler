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
    user: 'tuc_k_rw',
    host: 'pgsql.hrz.tu-chemnitz.de',
    database: 'tuc_k',
    password: 'ajai5Iow',
    port: 5432,
})
client.connect()
client.query('SELECT _random42()', (err, res) => {
    console.log(err, res)
    client.end()
})
