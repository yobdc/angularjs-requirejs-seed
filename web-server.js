/**
 * Module dependencies.
 */

var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 8000);
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app')));
app.engine('html', require('ejs').renderFile);

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});

app.get('/', function(req, res) {
	res.render('app/index.html');
});
app.get('/resources/dds/ContactInfo.Type', function(req, res) {
	res.send({
		keyword: 'ContactInfo.Type',
		options: [{
			code: '1',
			name: '手机'
		}, {
			code: '2',
			name: '邮箱'
		}, {
			code: '3',
			name: '电话'
		}, {
			code: '4',
			name: 'QQ'
		}]
	});
});
app.get('/resources/dds/CustomerType', function(req, res) {
	res.send({
		keyword: 'CustomerType',
		options: [{
			code: 'C',
			name: '个人'
		}, {
			code: 'B',
			name: '公司'
		}]
	});
});
app.get('/resources/supplier/validatename', function(req, res) {
	res.send({
		result: true
	});
});