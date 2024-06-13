var router = require('express').Router();
var jsonParser = require('body-parser').json();
const query = require('../postgres.js');
const jwtCheck = require('../auth.js');

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

    var result = await query("select * from second_test_table", []);
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