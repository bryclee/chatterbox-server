var utils = require('./utils.js');
var url = require('url');

global.messagesData = []; 

var responses = {
  'POST': function(request, response) {
    utils.collectData(request, function(body) {
      console.log('post body: ', body)
      global.messagesData.push(body);
      utils.writeResponse(response, 201);
    });
  },
  'GET': function(request, response) {
    var data = {};
    var result = global.messagesData.slice();
    var query = url.parse(request.url);
    if (query.order === '-createdAt') {
      data['results'] = result.reverse();
    } else {
      data['results'] = result;
    }
    utils.writeResponse(response, 200, data);
  }, 
  'OPTIONS': function(request, response) {
    utils.writeResponse(response, 200);
  }
};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);

  var statusCode;
  var serverResponse = responses[request.method]
  if (serverResponse) {
    serverResponse(request, response);
  } else {
    utils.writeResponse(response, 404)
  }
}

