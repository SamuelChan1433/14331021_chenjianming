var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {}
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/logon"] = requestHandlers.logon;
handle["/signin"] = requestHandlers.signin;
handle["/upload"] = requestHandlers.upload;
handle["/check"] = requestHandlers.check;

// css与js的请求
handle["/style/info.css"] = requestHandlers.info;
handle["/style/logOn.css"] = requestHandlers.logOnStyle;
handle["/style/signIn.css"] = requestHandlers.signInStyle;
handle['/javascripts/signIn.js'] = requestHandlers.signInStyle;
// localhost/username=abc
handle['/favicon.ico'] = function () {}

server.start(router.route, handle);
