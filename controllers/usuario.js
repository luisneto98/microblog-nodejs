const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

function generateToken(params = {}){
      return jwt.sign(params, authConfig.secret, {
            expiresIn: 3600
      });
}

module.exports = function(app){
      var UsuarioController = {
            authenticate: async (req, res) => {
                  var usuarioModel = app.models.usuario;
                  const { nickname, senha } = req.body;

                  const usuario = await usuarioModel.findOne({nickname}).select('+senha');

                  if(!usuario)
                        return res.status(200).send({ error: 'User not found' })


                  if(!await bcrypt.compare(senha, usuario.senha))
                        return res.status(200).send({ error: 'Invalid password' });
                  
                  
                  usuario.senha = undefined;
                  
                  const token = 

                  res.send({ 
                        usuario, 
                        token: generateToken({ id: usuario.id })  
                  });
                  
            },
            logout: async (req, res) =>{
                  if(typeof(req.session.usuario) != "undefined"){
                        req.session.destroy();
                        res.redirect("/");
                  }
            },

            register: async (req, res) =>{
                  var mongoose = require('mongoose');

                  req.assert('nome', 'Insira seu nome completo').notEmpty();
                  req.assert('nickname', 'Insira um apelido').notEmpty();
                  req.assert('email', 'Insira uma conta de e-mail válida').len(10, 50).isEmail();
                  req.assert('senha', 'Insira uma senha de no mínimo 6 caracteres').len(6, 20);
                  req.assert('conf_senha', 'Confira sua senha').len(6,20);
                  req.assert('conf_senha', 'As senhas não são compatíveis').equals(req.body.senha);
                  var errors = req.validationErrors();
                  if(errors){
                        return res.status(200).send({ error: 'Invalid request' })
                  }else{
                        try{
                              var usuarioModel = app.models.usuario;
                              const usuario = await usuarioModel.create(req.body);
                              usuario.senha = undefined
                              res.send({ 
                                    usuario, 
                                    token: generateToken({ id: usuario.id })  
                              });

                        }catch(err){
                              return res.status(200).send({ error: 'Registration failed' })
                        }    
                  }
            }
      }
  
      return UsuarioController;
};
    
