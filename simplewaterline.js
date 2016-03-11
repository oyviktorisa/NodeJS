var express = require('express');
var mysqlAdapter = require('sails-mysql');
var waterline = require('waterline');
var app = express();
var port = 9004;

var orm = new waterline();

var config = {
	adapters: {
		mysql: mysqlAdapter	
	},
	connections: {
		demoApp: {
			adapter: 'mysql',
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'password',
			database: 'demoapp'		
		}
	}
};

var user = waterline.Collection.extend({
	identity: 'user',
	tableName: 'demo_user',
	connection: 'demoApp',
	attributes: {
		user_id: 'integer',
		user_name: 'string',
		password: 'string',
		is_active: 'boolean',
		is_admin: 'boolean'	
	}
});

orm.loadCollection(user);

app.get('/users', function(req,res){
	app.models.user.find().exec(function(err,records){
		if(err) return res.json({err: err}, 500);
		res.json(records);
	});
});

orm.initialize(config,function(err,models){
	if(err) throw err;

	app.models = models.collections;
  	app.connections = models.connections;
	
	app.listen(port);
});
