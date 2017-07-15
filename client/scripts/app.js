// YOUR CODE HERE:
var app = {
  init: () => {
  },
  send: () => {
  },
  fetch: () => {
  }

};

$(document).ready( () => {

  

  var getMessages = function() {
    console.log('getMessages');
    $('#chats').empty();
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      data: { order: '-createdAt', limit: 30},
      success: function( data ) {
        // iterate through the data
        _.each(data.results, (message) => {
          //create a new element for each message
          // let el = $('<div>');
          // add the text
          let el = document.createElement('div');
          $(el).addClass('chat');
          let username = document.createElement('span');
          $(username).text(message.username);
          $(username).addClass('username');
          $(el).append(username);
          let msg = document.createElement('div');
          $(msg).text(message.text);
          $(el).append(msg);
          //append the div to chats 
          $('#chats').append(el);
          
        });
      },
    });
  };

  var postMessage = function() {
    //get messageText with .val
    // var user = (window.location.href).split('username=')[1];
    var message = {
      username: (window.location.href).split('username=')[1],
      text: $('#messageText').val(),
      roomname: '4chan'
    };
    $('#messageText').val(''),
    // debugger;
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify( message ),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent ', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  };
  getMessages();

  //add an event listener for #getMessages to get new messages
  $('#getMessages').on('click', getMessages);
  //add an event listener for #send to post a message
  $('#sendMessage').on('click', postMessage);
});
