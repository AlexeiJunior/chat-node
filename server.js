var express = require('express');
var socket = require('socket.io');

var app = express();
var server = app.listen(8080, function() {
  console.log('server running on port 8080');
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', function(socket) {
  console.log('chat connected id: ' + socket.id);

  socket.on('chat', function(data) {
    console.log(data.chatName + ' said: ' + data.message);
    io.sockets.emit('chat', data);
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('typing', data);
  });
});
