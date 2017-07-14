// YOUR CODE HERE:
$(document).ready(function() {
  var getMessages = function() {
    $('#chats').empty();
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      data: { order: '-createdAt', limit: 30 },
      success: function( data ) {
        // iterate through the data
        _.each(data.results, (message) => {
          //create a new element for each message
          let el = $('<div>');
          // add the text
          el.text(message.text);
          // username,
          //append the div to chats 
          $('#chats').prepend(el);
        });
      },
    });
  };
  getMessages();

  var user = (window.location.href).split('username=')[1];


  var message = {
    username: user,
    text: 'YEA!'
    // roomname: '4chan'
  };

  //add an event listener for #getMessages to get new messages
  $('#getMessages').on('click', getMessages);
  //add an event listener for #send to post a message
    //get messageText with .val



  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify( message ),
    order: '-createdAt',
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent ', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });

});
