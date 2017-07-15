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
  // var roomname = $('select').val() || 'Batcave';
  var roomname = $('select').val() || '77';
  var getMessages = function(room) {

    $('#chats').empty();
    $('select').empty();
    // $('select').append('<option>All Messages</option>');
    $.ajax({
      url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
      data: { order: '-createdAt', limit: 100},
      success: function( data ) {
        console.log('DATA', data);
        // MESSAGES
        var data = data.results;
        var filteredData = _.filter(data, (msg)=>{
          return msg.roomname === room;
        });        
        console.log('FILTERED DATA', filteredData);
        _.each(filteredData, (message) => {
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
        });

        //ROOMS 
        let rooms = [];
        _.each(data, (message) => {
          //dedup
          if (!rooms.includes(message.roomname)) {
            rooms.push(message.roomname);
          }
        });
        _.each(rooms, (el)=>{
          //create an option element for each room 
          let option = document.createElement('option');
          $(option).text(el);
          //append it to the DOM
          if ($(option).val() === roomname) {
            $(option).attr('selected', 'selected');
          }
          $('select').append(option);
        });
      },
    });
    console.log('gotMessages');
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
    getMessages(roomname);
  };
  getMessages(roomname);

  



  //add an event listener for #getMessages to get new messages
  $('#getMessages').on('click', getMessages);
  //add an event listener for #send to post a message
  $('#sendMessage').on('click', postMessage);
  $('select').change(()=>{ 
    roomname = $('select').val();
    getMessages(roomname); 
  });
});
