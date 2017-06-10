var querystring = require("querystring");
var fs = require("fs");
var sync = require("./sync"); // 读取与同步数据

function start(response, postData, ext) {
	console.log("Request handler 'start' was called.");
    
    
	var body = '<html>'+
      '<head>'+
        '<title>index</title>'+
      '</head>'+
      '<body>'+
        '<form action="/signin" method="post">'+
          '<input type="submit" value="Sign In">'+
        '</form>'+
        '<form action="/logon" method="post">'+
          '<input type="submit" value="Log On">'+
        '</form>'+
      '</body>'+
      '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function logon(response, postData, ext) {
	fs.readFile("./logOn.html", 'utf-8', function (err, data) {
	  if (err) throw (err);
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(data);
	  response.end();
	})
}

function logOnStyle(response, postData, ext) {
	if (ext == ".css") {
	  fs.readFile("./style/logOn.css", 'utf-8', function (err, data) {
	      if (err) throw (err);
	      response.writeHead(200, {"Content-Type": "text/css"});
	      response.write(data);
	      response.end();
	    });
	}
}

function signin(response, postData, ext) {
	fs.readFile('./signIn.html', 'utf-8', function (err, data) {
	  if (err) throw(err);
	  response.writeHead(200, {"Content-Type": "text/html"});
	  response.write(data);
	  response.end();
	});
}

function signInStyle (response, postData, ext) {
	if (ext == ".css") {
	  fs.readFile("./style/signIn.css", 'utf-8', function (err, data) {
	      if (err) throw (err);
	      response.writeHead(200, {"Content-Type": "text/css"});
	      response.write(data);
	      response.end();
	    });
	} else {
	  fs.readFile("./javascripts/signIn.js", function (err, data) {
	    if (err) throw (err);
	    response.writeHead(200, {"Content-Type": "application/javascript"});
	    response.write(data);
	    response.end();
	  });
	}
}

function info(response, postData, ext) {
	fs.readFile("./style/info.css", "utf-8", function (err, data) {
	  if (err) throw (err);
	  response.writeHead(200, {"Content-Type": "text/css"});
	  response.write(data);
	  response.end();
	})
}

function upload(response, postData, ext) {
  console.log("Request handler 'upload' was called.");
  var sign = "<h2>Sign In successfully</h2>";
  var name = querystring.parse(postData).username;
  sync.Existed(name, function(exist) {
    if (exist) {
      response.writeHead(200, {"Content-Type": "text/html"});
      response.write("<html>"+
        "<head><title>err</title>"+
        "<body>"+
        "<form action='/signin'>"+
        "Sign in failed. username is existed"+
        "<input type='submit' method='post' value='ok'>"+
        "</form>"+
        "</body>"+
        "</html>"
      );
      response.end();
    }
    else {
    show(response, postData, sign);
    // 同步数据
    sync.Existed(name, function(exist) {
      if (!exist)
        sync.writeToFile(postData);
      else console.log("file existed");
    })
  }
  });
}

function show(response, postData, message) {
  var name = querystring.parse(postData).username;
  var ID = querystring.parse(postData).ID;
  var phone = querystring.parse(postData).phone;
  var email = querystring.parse(postData).email;
  var body = "<html>"+
      "<head>"+
      "<title>Infomation</title>"+
      //'<link rel="stylesheet" type="text/css" href="style/info.css">'
      "</head>"+
      "<body>"+
      message+
      "<p>Administrator Infomation</p>"+
      "<ul>"+
      "<li>UserName: "+name+"</li>"+
      "<li>Student ID: "+ID+"</li>"+
      "<li>Phone Number: "+phone+"</li>"+
      "<li>E-mail: "+email+"</li>"+
      "</ul>"+
      "<form action='/start'>"+
      "<input type='submit' value='Return'>"+
      "</form>"+
      "</html>";
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write(body);
  response.end();
}

function check (response, postData, ext) { // 确认logon时是否有该用户
	name = querystring.parse(postData).username;
	sync.Existed(name, function(exist) {
	 if (exist) {
	   var log = "<h2>Welcome!</h2>";
	   var postData;
	   fs.readFile("./allusers/"+name+".txt", 'utf-8', function (err, data) {
	     if (err) throw (err);
	     postData = data;
	   var id=querystring.parse(postData).ID;
	   console.log("Read form data successfully.");
	   show(response, postData, log);
	   })
	 } else {
	  signin(response, postData, ext);
	 }
	});
}

exports.start = start;
exports.logon = logon;
exports.signin = signin;
exports.signInStyle = signInStyle;
exports.logOnStyle = logOnStyle;
exports.upload = upload;
exports.info = info;
exports.check = check;
