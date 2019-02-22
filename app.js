var express = require('express');
var http = require('http');
var path = require('path');
var routes = require('./routes');

var app = express();
    
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
    
app.get('/', routes);
    
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});