$(function() {
  var socket = io.connect('http://localhost:8080');

  var btn = $("#btn");
  var txt = $("#textarea");
  var name = $("#name");
  var text = $("#text");
  var feedback = $("#feedback");

  btn.click(function() {
    socket.emit('chat', {
      message: text.val(),
      chatName: name.val()
    });

    text.val('');
    text.focus();
  });

  socket.on('chat', function(data) {
    feedback.html('');
    txt.append('<p><strong>' + data.chatName + ':</strong> ' + data.message + '</p>');
  });

  text.keypress(function() {
    socket.emit('typing', name.val());
  });

  $(document).keypress(function(e) {
      if (e.which == 13) {
          btn.trigger("click");
      }
  });

  socket.on('typing', function(data) {
    feedback.html('<p><em>' + data + ' is typing..</em></p>');
  });

});
