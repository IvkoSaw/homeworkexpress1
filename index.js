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

function task7(req, res, next){
	var body = req.body;
	var query = req.query;

	if (_.size(body) > 0) {
		fs.appendFile('./body.txt', body, 'utf8', function(err){
			if (err) {
				console.log(err);
				return;
			}
			console.log('body --- done');
		});
	}
	if (_.size(query) > 0) {
		fs.appendFile('./query.txt', query, 'utf8', function(err){
			if (err) {
				console.log(err);
				return;
			}
			console.log('query --- done');
		});
	}
	console.log(body, query);
	next();
};

app.use(task4);
app.use(task6);
app.use(task7);
app.get('/', function(req, res){
	res.send();
});

app.listen(3000, function(){
	console.log('app listening on port 3000');
});