const { Pool } = require('pg');
const fs = require('fs');

const pool = new Pool(JSON.parse(fs.readFileSync('postgresAuthentication.json')));

function query(text, values){
    return pool.query(text, values);
}

module.exports = query;