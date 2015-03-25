var utils = require('./utils.js');
var url = require('url');

global.messagesData = { 'messages': [], 'room1': [] }; 

var responses = {
  'POST': function(request, response, query) {
    utils.collectData(request, function(body) {
      body.updatedAt = Date.now();
      if (global.messagesData[body.roomname] === undefined) {
        var room = global.messagesData['messages'];
      } else {
        var room = global.messagesData[body.roomname]
      }
      room.push(body);
      utils.writeResponse(response, 201);
    });
  },
  'GET': function(request, response, query) {
    var data = {};
    if (global.messagesData[query.roomname] === undefined) {
        var room = global.messagesData['messages'].slice();
      } else {
        var room = global.messagesData[query.roomname].slice();
      }
    var result = [];
    for (var i = room.length-1; i >= 0; i--) {
      if( room[i].updatedAt > query.updatedAt) {
        result.push(room[i]);
      } else {
        break;
      }
    };
    if (query.order === '-createdAt') {
      data['results'] = result.reverse();
    } else {
      data['results'] = result;
    }

    utils.writeResponse(response, 200, data);
  }, 
  'OPTIONS': function(request, response, query) {
    utils.writeResponse(response, 200);
  }
};

exports.requestHandler = function(request, response) {
  console.log("Serving request type " + request.method + " for url " + request.url);
  var query = url.parse(request.url, true).query;
  var serverResponse = responses[request.method]
  if (serverResponse) {
    serverResponse(request, response, query);
  } else {
    utils.writeResponse(response, 404, 'Bad method')
  }
}

