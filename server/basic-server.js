/* Import node's http module: */
var fs =  require('fs');
var http = require("http");
var url = require('url');
var handleRequest = require('./request-handler.js').requestHandler;

// Every server needs to listen on a port with a unique number. The
// standard port for HTTP servers is port 80, but that port is
// normally already claimed by another server and/or not accessible
// so we'll use a standard testing port like 3000, other common development
// ports are 8080 and 1337.
var port = 3000;

// For now, since you're running this server on your local machine,
// we'll have it listen on the IP address 127.0.0.1, which is a
// special address that always refers to localhost.
var ip = "127.0.0.1";

// fs.open('./classes/chatterbox/messages.txt', 'a+', function(err, fd) {
//   //fs.write(fd, 'hello world\ntestline', function (err, data) {})
//   var data = [];
//   fs.read(fd, data, 0,  function(err, data) {
//     console.log(data);
//   });
// })

/*  For File Reading 
fs.readFile('./classes/chatterbox/messages.txt', {encoding: 'utf8'}, function(err, data) {
    console.log(data);
})
*/

// We use node's http module to create a server.
//
// The function we pass to http.createServer will be used to handle all
// incoming requests.
//
// After creating the server, we will tell it to listen on the given port and IP. */
var server = http.createServer(handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);



