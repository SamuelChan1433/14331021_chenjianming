var fs = require("fs");
var path = require("path");
var querystring = require("querystring");

function Existed (username, result) {
    fs.exists("./allusers/"+username+".txt", function(ex) {
      console.log("is_exists: "+ex);
      result(ex);
    });
}

function writeToFile (postData) {
	var user = querystring.parse(postData).username;
	fs.writeFile("allusers/"+user+".txt", postData, function(e) {
	  if(e) throw e;
	  console.log("file writen");
	});
}

exports.Existed = Existed;
exports.writeToFile = writeToFile;

