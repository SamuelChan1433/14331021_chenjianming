function route(handle, pathname, response, postData, ext) {
	console.log("About to route a request for " + pathname);
	/*if (pathname == "/check") {
	  handle[pathname](response, username);
	}
	else*/ if (typeof handle[pathname] === 'function') {
	  handle[pathname](response, postData, ext);
	} else {
	  console.log("No request handler found for " + pathname);
	  response.write("404 not found");
	  response.end();
	}
}

exports.route = route;
