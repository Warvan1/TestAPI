const { auth } = require('express-oauth2-jwt-bearer');
const fs = require('fs');

const jwtCheck = auth(JSON.parse(fs.readFileSync('auth0Authentication.json')));

module.exports = jwtCheck;