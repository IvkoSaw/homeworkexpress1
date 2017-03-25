var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');
var _ = require('underscore');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('static'));

function task4(req, res, next){
	console.log('New Request!');
	next();
};

function task6(req, res, next){
	var object = {};
	var method = req.method;
	var protocol = req.protocol;
	var isAjax = req.xhr;
	
	object.method = method;
	object.protocol = protocol;
	object['is Ajax?'] = isAjax;
	console.log(object);
	next();
};

app.use(task4);
app.use(task6);
app.get('/', function(req, res){
	res.send();
});

app.listen(3000, function(){
	console.log('app listening on port 3000');
});
