const express = require('express');
var registerRoutes = require('./routes/index.js');
var cors = require('cors');

const app = express();

var corsOptions = {
    origin: 'http://localhost:5000',
    optionsSuccesStatus: 200
}

app.use(cors(corsOptions));

registerRoutes(app)

app.listen(5000);