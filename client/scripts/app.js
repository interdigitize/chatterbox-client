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
    $('select').empty();
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      data: { order: '-createdAt', limit: 30},
      success: function( data ) {
        //make an array for room names
        let rooms = [];
        // iterate through the data
        _.each(data.results, (message) => {
          //create a chat element for each message
          let el = document.createElement('div');
          $(el).addClass('chat');
          // create an element for the user name
          let username = document.createElement('span');
          $(username).text(message.username);
          $(username).addClass('username');
          $(el).append(username);
          // create an element for the message
          let msg = document.createElement('div');
          $(msg).text(message.text);
          $(el).append(msg);
          //append the div to chats 
          $('#chats').append(el);
          //add roomnames 
          if (!rooms.includes(message.roomname)) {
            rooms.push(message.roomname);
          }
        });
        _.each(rooms, (el)=>{
          let option = document.createElement('option');
          $(option).text(el);
          $('select').append(option);
        });
            //dedup
            //create an option element for each room 
            //append it to the DOM
      },
    });
  };

  var postMessage = function() {
    var message = {
      username: (window.location.href).split('username=')[1],
      text: $('#messageText').val(),
      roomname: $('select').val()
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
    getMessages();
  };
  getMessages();

  //add an event listener for #getMessages to get new messages
  $('#getMessages').on('click', getMessages);
  //add an event listener for #send to post a message
  $('#sendMessage').on('click', postMessage);
});
