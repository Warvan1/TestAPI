const express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
const { auth } = require('express-oauth2-jwt-bearer');
const fs = require('fs');

const app = express();
//used to parse the body of a post request using json
var jsonParser = bodyParser.json();

const jwtCheck = auth(JSON.parse(fs.readFileSync('authentication.json')));

var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccesStatus: 200
}

app.use(cors(corsOptions));

app.get('/express/', (req, res) => {
    res.json({
        type: "index"
    });
});

app.get('/express/public', (req, res) => {
    console.log(req.headers);

    res.json({
        type: "public"
    });
});

app.get('/express/private', jwtCheck, (req, res) => {
    console.log("GET SUCCESS!!!");
    console.log(req.headers);

    res.json({
        type: "private",
    });
});

app.post('/express/private', jwtCheck, jsonParser, (req, res) => {
    console.log("POST SUCCESS!!!");
    console.log(req.headers);
    console.log(req.body);

    res.json({
        type: "private post",
        // name: req.body.user.name
    });
});

app.post('/express/senduser', jwtCheck, jsonParser, (req, res) => {
    console.log("recieved user!!!");
    console.log(req.headers);
    console.log(req.body);

    res.json({
        type: "senduser response",
    })
})

app.listen(5000);