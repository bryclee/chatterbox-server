var headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10,
  "Content-Type": "application/json"
};

exports.collectData = function(request, callback) {
  var body = '';
  request.on('data', function(chunk) {
    body += chunk;
  });

  request.on('end', function() {
    callback(JSON.parse(body));
  })
};

exports.writeResponse = function(response, statusCode, data) {
  response.writeHead(statusCode, headers);
  response.end(JSON.stringify(data));
};