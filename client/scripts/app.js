// YOUR CODE HERE:
var app = {
  roomname: $('select').val() || '',
  friends: {},
  init: () => {
    console.log('works');
     //add an event listener for #getMessages to get new messages
    $('#getMessages').on('click', ()=> { 
      app.roomname = $('select').val();
      app.fetch(app.roomname); 
    });
    //add an event listener for #send to post a message
    $('#sendMessage').on('click', app.send);
    $('select').change(()=>{ 
      app.roomname = $('select').val();
      app.fetch(app.roomname); 
    });
    $('#chats').on('click', 'div', function() {
      var newFriend = $(this).find('span').text();
      if (app.friends.hasOwnProperty(newFriend)) {
        delete app.friends[newFriend];
      } else {
        app.friends[newFriend] = newFriend;
      }
      app.fetch(app.roomname);
      console.log('FRIEMDS', app.friends);
    });
  },
  send: () => {
    var room = $('#newRoom').val() || app.roomname;
    var message = {
      username: (window.location.href).split('username=')[1],
      text: $('#messageText').val(),
      roomname: room
    };
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
    app.fetch(app.roomname);
  },
  fetch: (room) => {
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
          // if the username is a friend
          if (app.friends.hasOwnProperty(message.username)) {
            //add the friend class  
            $(el).addClass('friend');
          }
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
          if ($(option).val() === app.roomname) {
            $(option).attr('selected', 'selected');
          }
          $('select').append(option);
        });
      },
    });
    console.log('gotMessages');

  }
};

$(document).ready( () => {
  // var roomname = $('select').val() || 'foo';
  // var friends = {};
  // var getMessages = function(room) {

  //   $('#chats').empty();
  //   $('select').empty();
  //   // $('select').append('<option>All Messages</option>');
  //   $.ajax({
  //     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  //     data: { order: '-createdAt', limit: 100},
  //     success: function( data ) {
  //       console.log('DATA', data);
  //       // MESSAGES
  //       var data = data.results;
  //       var filteredData = _.filter(data, (msg)=>{
  //         return msg.roomname === room;
  //       });        
  //       console.log('FILTERED DATA', filteredData);
  //       _.each(filteredData, (message) => {
  //         //create a chat element for each message
  //         let el = document.createElement('div');
  //         $(el).addClass('chat');
  //         // create an element for the user name
  //         let username = document.createElement('span');
  //         $(username).text(message.username);
  //         $(username).addClass('username');
  //         // if the username is a friend
  //         if (friends.hasOwnProperty(message.username)) {
  //           //add the friend class  
  //           $(el).addClass('friend');
  //         }
  //         $(el).append(username);
  //         // create an element for the message
  //         let msg = document.createElement('div');
  //         $(msg).text(message.text);
  //         $(el).append(msg);
  //         //append the div to chats 
  //         $('#chats').append(el);
  //         //add roomnames 
  //       });

  //       //ROOMS 
  //       let rooms = [];
  //       _.each(data, (message) => {
  //         //dedup
  //         if (!rooms.includes(message.roomname)) {
  //           rooms.push(message.roomname);
  //         }
  //       });
  //       _.each(rooms, (el)=>{
  //         //create an option element for each room 
  //         let option = document.createElement('option');
  //         $(option).text(el);
  //         //append it to the DOM
  //         if ($(option).val() === roomname) {
  //           $(option).attr('selected', 'selected');
  //         }
  //         $('select').append(option);
  //       });
  //     },
  //   });
  //   console.log('gotMessages');

  // };


  // var postMessage = function() {
  //   var room = $('#newRoom').val() || $('select').val();
  //   var message = {
  //     username: (window.location.href).split('username=')[1],
  //     text: $('#messageText').val(),
  //     roomname: room
  //   };
  //   $('#messageText').val(''),
  //   // debugger;
  //   $.ajax({
  //     // This is the url you should use to communicate with the parse API server.
  //     url: 'http://parse.sfm8.hackreactor.com/chatterbox/classes/messages',
  //     type: 'POST',
  //     data: JSON.stringify( message ),
  //     contentType: 'application/json',
  //     success: function (data) {
  //       console.log('chatterbox: Message sent ', data);
  //     },
  //     error: function (data) {
  //       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //       console.error('chatterbox: Failed to send message', data);
  //     }
  //   });
  //   getMessages(roomname);
  // };
  // getMessages(roomname);

  
  // //add an event listener for #getMessages to get new messages
  // $('#getMessages').on('click', ()=> { 
  //   roomname = $('select').val();
  //   getMessages(roomname); 
  // });
  // //add an event listener for #send to post a message
  // $('#sendMessage').on('click', postMessage);
  // $('select').change(()=>{ 
  //   roomname = $('select').val();
  //   getMessages(roomname); 
  // });
  // $('#chats').on('click', 'div', function() {
  //   var newFriend = $(this).find('span').text();
  //   if (friends.hasOwnProperty(newFriend)) {
  //     delete friends[newFriend];
  //   } else {
  //     friends[newFriend] = newFriend;
  //   }
  //   getMessages(roomname);
  //   console.log('FRIEMDS', friends);
  // });
});
