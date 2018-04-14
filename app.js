//
// Node Modules
//
var http = require('http');
var express = require('express');
var ejs = require('ejs');

//
// Express Initialization
//
var app = express();
    app.set('views', __dirname + '/app');
    app.engine('jade', require('jade').__express);
    app.engine('html', require('ejs').renderFile);
    app.engine('css', require('ejs').renderFile);
    app.engine('js', require('ejs').renderFile);

//
// Routes
//
app.use(express.static('static'));

app.get('/app/:module/:file', function(req, res){
  res.render(req.params.module + '/' + req.params.file);
});


app.get('/:file', function(req, res){
  res.render('index.jade');
});

app.get('/', function(req, res){
  res.render('index.jade');
});

//
//  Server Start
//
var server = http.createServer(app);
    server.listen(process.env.OPENSHIFT_NODEJS_PORT || 8080, process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0');
