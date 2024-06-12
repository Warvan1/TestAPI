var express = require('express');
const fs = require('fs');
const { Pool } = require('pg');
const { auth } = require('express-oauth2-jwt-bearer');
var bodyParser = require('body-parser');

var router = express.Router();

const pool = new Pool(JSON.parse(fs.readFileSync('postgresAuthentication.json')));
const jwtCheck = auth(JSON.parse(fs.readFileSync('auth0Authentication.json')));
var jsonParser = bodyParser.json();

router.get('/', (req, res) => {
    res.json({
        type: "index"
    });
});

router.get('/public', (req, res) => {
    console.log(req.headers);

    res.json({
        type: "public"
    });
});

router.get('/private', jwtCheck, (req, res) => {
    console.log("GET SUCCESS!!!");
    console.log(req.headers);

    res.json({
        type: "private",
    });
});

router.post('/private', jwtCheck, jsonParser, async (req, res) => {
    console.log("POST SUCCESS!!!");
    console.log(req.headers);
    console.log(req.body);

    var result = await pool.query("select * from second_test_table", []);
    // var result = await pool.query("insert into second_test_table(name, email) values($1, $2) returning *", ['express3', 'express@test.com']);
    console.log(result.rows);

    res.json({
        type: "private post",
        result: result.rows,
        // name: req.body.user.name
    });
});

router.post('/senduser', jwtCheck, jsonParser, (req, res) => {
    console.log("recieved user!!!");
    console.log(req.headers);
    console.log(req.body);

    res.json({
        type: "senduser response",
    })
})

module.exports = router;