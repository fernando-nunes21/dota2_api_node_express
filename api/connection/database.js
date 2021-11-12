const pgp = require('pg-promise')();
const db = pgp({
    user: 'postgres',
    password: '1a2b3c',
    host: 'localhost',
    port: '5432',
    database: 'dota2'
})

module.exports = db;