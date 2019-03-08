module.exports = function(app){
      var NweetController = {

            submit: async(req,res) => {

                  req.assert('texto', 'Insira o conteúdo do seu nweet').len(1,140);
                  var errors = req.validationErrors();

                  if(errors){
                        return res.status(200).send({ error: 'Invalid request' });
                  }else{
                        try{
                              var nweetModel = app.models.nweet;
                              nweet = {texto: req.body.texto, autor: req.userId};

                              var nweet = await nweetModel.create(nweet);
                              return res.send({ nweet })
                        }catch(err){
                              return res.status(500).send({ error: 'Internal error' });
                        }
                        
                  }
            },
            listAll: async (req,res) => {
                  try{
                        var nweetModel = app.models.nweet;
                        nweets = await nweetModel.find().populate('autor').sort( [['data', 'descending']] )
                        return res.send({ nweets })
                  }catch(err){
                        return res.status(500).send({ error: 'Internal error' });
                  }
                  
            }
      }

    return NweetController;
};
