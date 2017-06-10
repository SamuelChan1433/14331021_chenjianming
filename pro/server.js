var http = require("http");
var url = require("url");
var querystring = require("querystring");
var sync = require("./sync");

function start(route, handle) {
	function onRequest(request, response) {
	  var postData = "";
	  var pathname = url.parse(request.url).pathname;
	  console.log("Request for " + pathname + " received");
	  
	  /*var qname = querystring.parse(url.parse(request.url).query).username;
	  //var isExisted = 0;
	  sync.Existed(qname, function(result) {
	    if (result) {
	      console.log("\nExisted\n");
	      //isExisted = 1;
	      //
	    } else {
	      console.log("**** NOT Existed");
	      //isExisted = 0;
	    }
	  })*/
	  
	  
	  
	  var ext = pathname.match(/(\.[^.]+|)$/)[0]; // 取得后缀名

	  request.setEncoding("utf8");
	  request.addListener("data", function(postDataChunk) {
	    postData += postDataChunk;
	    console.log("Received POST data chunk '" +
	    postDataChunk + "'.");
	  });
	  request.addListener("end", function() {
	    route(handle, pathname, response, postData, ext);
	  })
	}
	http.createServer(onRequest).listen(8080);
	console.log("Server is started");
}

exports.start = start;
