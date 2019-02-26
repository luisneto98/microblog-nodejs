module.exports = function(){
    const db = require('mongoose');
    const bcrypt = require('bcrypt');

    var Schema = db.Schema;
 
    var usuario = Schema({
        nome: {type: String, required: true},
        nickname: {type: String, required: true, index:{unique:true}},
        email: {type: String, required: true, index:{unique:true}},
        senha: {type: String, required: true, select: false}
    });
    
    usuario.pre('save', async function(next){
        const hash = await bcrypt.hash(this.senha,10);
        this.senha = hash;

        next();
    });

    return db.model('usuarios', usuario);
}