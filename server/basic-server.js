var fs =  require('fs');
var http = require("http");
var url = require('url');
var utils = require('./utils.js');
var handleRequest = require('./request-handler.js').requestHandler;

var port = 3000;

var ip = "127.0.0.1";

var routes = {
  '/classes/messages': handleRequest,
  '/classes/room1' : handleRequest
};

var server = http.createServer(function(request, response) {
  var path = url.parse(request.url).pathname;
  var route = routes[path];
  if (route) {
    handleRequest(request, response);
  } else {
    utils.writeResponse(response, 404, 'Bad request');
  }

});
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);
