var routes          = require('./server/router');
var express         = require('express');
var path            = require('path');
var bodyParser      = require('body-parser');
var url             = require('url');
var mongoose        = require('mongoose');
var config          = require('./configs/config');

var express = require('express');
var app = express();
//var cors = require('cors');
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Expose-Headers', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  next();
});

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
        console.log('DB connection error:', err.message);

});
db.once('open', function callback () {
    console.log("Successfully connected to DB");
    var app  = express();
    app.use(bodyParser.json());
    routes.setup(app);

    app.listen(config.get('httpPort'), function () {
            console.log("Express server listening on port " + config.get('httpPort'));
    });

});

