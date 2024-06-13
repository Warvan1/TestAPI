const public = require("./public.js");
const private = require("./private.js");

function registerRoutes(app){
    app.use('/express', public);
    app.use('/express', private);
}

module.exports = registerRoutes;