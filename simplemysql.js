var express = require('express');
var mysql = require('mysql');
var app = express();
var port = 9003;

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : 'password',
	database : 'tugas1' 
});

var pool = mysql.createPool({
	connectionLimit : 100,
	user : 'root',
	password : 'password',
	database : 'tugas1',
	debug	 : false
});

connection.connect(function(err){
	if(!err) {
		console.log("Database is connected...\n");	
	} else {
		console.log("Error connecting database...\n");
	}
});

app.get('/sql', function(req,res){
	connection.query('SELECT * from tbl_tugas1',function(err,rows,fields) {
		connection.end();
		if(!err) {
			res.json(rows);		
		} else {
			console.log("Error performing query.");
		}
	});
});

app.get('/sql/pool', function(req,res){
	pool.getConnection(function(err,connection){
		if(err) {
			connection.release();
			res.json({"status" : 100, "message" : "Error connecting database"});
			return;		
		}

		console.log('connected as id '+connection.threadId);

		connection.query('SELECT * from tbl_tugas1',function(err,rows,fields) {
			connection.release();
			if(!err) {
				res.json(rows);	
			}
		});
		
		connection.on('error',function(err) {
			res.json({"status" : 100, "message" : "Error connecting database"});
		});
	});
});

var server = app.listen(port,function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Web server is listening at http://%s:%s",host,port)
});
