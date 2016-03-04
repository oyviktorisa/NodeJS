var express = require('express');
var fs = require('fs');
var app = express();
var port = 9001;
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var rootPath = '/home/viktorisa/Pictures/';

app.get('/img/:path', function(req,res){
	if(!req || !req.params.path) res.status(500).json({success: false, message: err});
	var img = rootPath.concat(req.params.path);
	console.log("Image path %s",img);
	fs.readFile(img, function(err,data){
		if(!data) res.status(500).json({success: false, message: err});
		else {
			var base64Image = new Buffer(data).toString('base64');
			var stats = fs.statSync(img);
			res.status(200).json({isi_berkas: base64Image,lokasi_berkas: img,ukuran_berkas: stats["size"]});
			console.log("Completed");	
		}		
	});
	console.log("Please wait...");
});

app.get('/img/sync/:path', function(req,res){
	if(!req || !req.params.path) res.status(500).json({success: false, message: err});
	var img = rootPath.concat(req.params.path);
	console.log("Image path %s",img);
	var bitmap = fs.readFileSync(img);
	if(!bitmap) res.status(500).json({success: false, message: err});
	else {
		var base64Image = new Buffer(bitmap).toString('base64');
		var stats = fs.statSync(img);
		res.status(200).json({isi_berkas: base64Image,lokasi_berkas: img,ukuran_berkas: stats["size"]});
		console.log("Completed");	
	}
	console.log("Please wait...");
});

var server = app.listen(port,function() {
	var host = server.address().address
	var port = server.address().port
	console.log("Web server is listening at http://%s:%s",host,port)
});
