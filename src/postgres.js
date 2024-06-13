const fs = require('fs');
const { Pool } = require('pg');

const pool = new Pool(JSON.parse(fs.readFileSync('postgresAuthentication.json')));

function query(text, values){
    return pool.query(text, values);
}

module.exports = query;