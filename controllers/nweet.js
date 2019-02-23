module.exports = function(app){
    var NweetController = {

          submit: function(req,res){

                  req.assert('texto', 'Insira o conteúdo do seu nweet').len(1,140);

                  var errors = req.validationErrors();

                  if(errors){
                  res.render("/", {'errors': errors});
          }else{
                  var nweetModel = app.models.nweet;

                  nweet = {texto: req.body.texto,autor: req.session.usuario._id};
                  
                  nweetModel.create(nweet, function(error, nweet){
                        res.redirect("/");
                  });
           }
          }
    }

    return NweetController;
};