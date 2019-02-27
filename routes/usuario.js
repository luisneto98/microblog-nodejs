module.exports = function(app){
    var usuario = app.controllers.usuario;

    app.post("/usuario/authenticate", usuario.authenticate);
    app.get("/usuario/logout", usuario.logout);
    app.post("/usuario/register", usuario.register);


}
var isLoggedIn = function(req, res, next){
    if(typeof(req.session.usuario) != "undefined"){
          if(req.session.usuario != ""){
                res.redirect("/");      
          }
    }
    next();
}