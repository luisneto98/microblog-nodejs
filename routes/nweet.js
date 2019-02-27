const authMiddleware = require('../middlewares/auth')

module.exports = function(app){
    var nweet = app.controllers.nweet;
    app.post("/nweet/submit", authMiddleware,nweet.submit);
    app.get("/nweet/listAll",nweet.listAll);

}