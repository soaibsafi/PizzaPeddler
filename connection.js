const { Pool, Client } = require("pg");
const pool = new Pool({
  user: "tuc_k_rw",
  host: "pgsql.hrz.tu-chemnitz.de",
  database: "tuc_k",
  password: "ajai5Iow",
  port: 5432,
});
pool.query("SELECT hello()", (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = new Client({
  user: "tuc_k_rw",
  host: "pgsql.hrz.tu-chemnitz.de",
  database: "tuc_k",
  password: "ajai5Iow",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
