module.exports = function(app){
      var UsuarioController = {
  
            login: function(req, res){
                  res.render('usuario/login');
            },
  
            loginAction: function(req, res){
                  req.assert('nickname', 'Insira um apelido').notEmpty();
                  req.assert('senha', 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);

                  var errors = req.validationErrors();

                    if(!errors){
                        var usuarioModel = app.models.usuario;
                        var query = {nickname: req.body.nickname, senha: req.body.senha};
                        usuarioModel.findOne(query).select('nome email nickname').exec(function(error, usuario){
                              console.log("entrou");
                              if(usuario){
                                    req.session.usuario = usuario;
                                    res.redirect('/');
                              }else{
                                    res.render('usuario/login', {'errors': [{'msg': 'Nickname ou Senha inválida'}]})
                              }
                        });

                  }else{
                        res.render('usuario/login', {'errors': errors});
                  }
            },
            logout: function(req, res){
                  if(typeof(req.session.usuario) != "undefined"){
                        req.session.destroy();
                        res.redirect("/");
                  }
            },
            cadastro: function(req, res){
                  res.render("usuario/cadastro");
            },
        
            cadastroAction: function(req, res){
                  var mongoose = require('mongoose');

                  req.assert('nome', 'Insira seu nome completo').notEmpty();
                  req.assert('nickname', 'Insira um apelido').notEmpty();
                  req.assert('email', 'Insira uma conta de e-mail válida').len(10, 50).isEmail();
                  req.assert('senha', 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);
                  req.assert('conf_senha', 'Confira sua senha').len(6,20);
                  req.assert('conf_senha', 'As senhas não são compatíveis').equals(req.body.senha);
                  var errors = req.validationErrors();
                  var usuarioObj = {
                        nome: req.body.nome,
                        nickname: req.body.nickname,
                        email: req.body.email,
                        senha: req.body.senha,
                        conf_senha: req.body.conf_senha                       
                  }
                  if(errors){
                        res.render("usuario/cadastro", {'errors': errors});
                  }else{
                        var usuarioModel = app.models.usuario;
                  
                        usuarioModel.create(usuarioObj, function(error, usuario){
                              if(error){
                                    res.render("usuario/cadastro", {'errors': [{'msg': error.err}]});
                              }else{
                                    res.redirect("usuario/login");
                              }
                        });
                  }
            }
      }
  
      return UsuarioController;
};
    