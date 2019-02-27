var express = require('express');
var http = require('http');
var path = require('path');
var load = require('express-load');
var expressValidator = require("express-validator");
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')
var session = require('express-session');
var bodyParser = require('body-parser')

//config conection db
var mongoDB = 'mongodb://localhost:27017/nweet';
mongoose.connect(mongoDB, {useNewUrlParser: true}).then(
    ()=> console.log('connected to db')
).catch(
    (err)=> console.error(err)
);

var app = express();
    
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');

app.use(expressValidator());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret: 'secret',
    name: 'cookie_nweet',
    proxy: true,
    resave: true,
    saveUninitialized: true}));

load('models').
then('controllers').
then('routes').
into(app);


http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});