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
app.get('/resources/dds/Site.BusinessScope', function(req, res) {
	res.send({
		keyword: 'Site.BusinessScope',
		options: [{
			code: '1',
			name: '收货'
		}, {
			code: '2',
			name: '收票'
		}]
	});
});
app.get('/resources/dds/PaymentTerm', function(req, res) {
	res.send({
		keyword: 'PaymentTerm',
		options: [{
			code: 'now',
			name: '收妥即付款'
		}, {
			code: '30',
			name: '30天'
		}, {
			code: 'fenqi',
			name: '分期付款'
		}]
	});
});
app.get('/resources/dds/maritalStatus', function(req, res) {
	res.send({
		keyword: 'maritalStatus',
		options: [{
			code: 'unmarried',
			name: '未婚'
		}, {
			code: 'married',
			name: '已婚'
		}]
	});
});
app.get('/resources/dds/gender', function(req, res) {
	res.send({
		keyword: 'gender',
		options: [{
			code: 'male',
			name: '男'
		}, {
			code: 'female',
			name: '女'
		}]
	});
});
app.get('/resources/dds/education', function(req, res) {
	res.send({
		keyword: 'education',
		options: [{
			code: 'bachelor',
			name: '本科'
		}, {
			code: 'master',
			name: '硕士'
		}]
	});
});
app.get('/resources/dds/Workday', function(req, res) {
	res.send({
		keyword: 'Workday',
		options: [{
			code: 'Monday',
			name: '星期一'
		}, {
			code: 'Tuesday',
			name: '星期二'
		}, {
			code: 'Wednesday',
			name: '星期三'
		}, {
			code: 'Thursday',
			name: '星期四'
		}, {
			code: 'Friday',
			name: '星期五'
		}, {
			code: 'Saturday',
			name: '星期六'
		}, {
			code: 'Sunday',
			name: '星期天'
		}]
	});
});
app.get('/resources/dds/PaymentMethod', function(req, res) {
	res.send({
		keyword: 'PaymentMethod',
		options: [{
			code: 'CSH',
			name: '现金'
		}, {
			code: 'CRD',
			name: '银行卡'
		}, {
			code: 'ALP',
			name: '支付宝'
		}, {
			code: 'UNP',
			name: '银联'
		}]
	});
});
app.get('/resources/dds/BillSettleType', function(req, res) {
	res.send({
		keyword: 'BillSettleType',
		options: [{
			code: 'Ordinary',
			name: '普通'
		}, {
			code: 'Month',
			name: '月结'
		}]
	});
});
app.get('/resources/dds/identityCardType', function(req, res) {
	res.send({
		keyword: 'identityCardType',
		options: [{
			code: 'IDCard',
			name: '身份证'
		}, {
			code: 'Passport',
			name: '护照'
		}]
	});
});
app.get('/resources/supplier/validatename', function(req, res) {
	res.send({
		result: true
	});
});
app.get('/resources/supplier/search', function(req, res) {
	res.send([{
		name: '111'
	}, {
		name: '222'
	}, {
		name: '333'
	}]);
});