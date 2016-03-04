var http = require('http');
var fs = require('fs');
var soap = require('soap');

var service = {
	helloService: {
		helloPort: {
			Hello: function(helloInput) {
				return {
					helloOutput: helloInput
				};
			}		
		}	
	}
};

var xml = fs.readFileSync('spesifikasi.wsdl','utf8');

var server = http.createServer(function (req,res) {
	res.end("404: Not Found: " + req.url);
});

server.listen(9002,'127.0.0.1');
soap.listen(server,'/sayhello',service,xml);
