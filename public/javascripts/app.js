$(document).ready(function () {
  
  var socket = io.connect();
  var template ='<li class="type">{{message}}</li>';
  
  // UI Hub stuff
  
  $.subscribe('/event1', function( data ) {
    var output =  Mustache.render(template, data);
    $('.event-container').append(output);
  });
  
  $.subscribe('/event2', function(data) {
    socket.emit('/event2', data);
  });
  
  $.subscribe('/event3', function(data) {
    var output =  Mustache.render(template, data);
    $('.event-container').append(output);    
  });
  
  $.subscribe('/log/client', function(data) {
    var output = Mustache.render(template, data);
    $('.client-log-container').append(output)
  });
  
  $.subscribe('/log/server', function(data){
    var output = Mustache.render(template, data);
    $('.server-log-container').append(output)
  });
  
  $.subscribe('/chat', function( data ){
    var output = Mustache.render(template, data);
    $('.event-container').append(output);
  });
  
  // DOM Events
  
  $('#event-button-1').click(function(){
    $.publish('/event1', [{ message:'/event1: This is a local jQuery pub/sub event.' }]);
  });
  
  $('#event-button-2').click(function(){
    var data = { 
      message: '/event2 Triggered event 2 on client and sent it to the server.'
      };
    socket.emit('/event2', data);
    $.publish('/log/client', [data])
  });
  
  $('#event-button-3').click(function(){
    var data = { 
      message: "This events triggers on click and then sends it to the server which in turns sends it back to the client."
    };
    socket.emit('/event3', data)
    $.publish('/log/client', [data]);
  });
  
  $('#event-button-4').click(function(){
    var data = { 
      message: "Chat message."
    };
    socket.emit('/chat', data)
    $.publish('/log/client', [data]);
  });
  
  $('#event-button-5').click(function(){
    console.log('button #5 clicked');
  });

  $('#event-button-6').click(function(){
    console.log('button #6 clicked');
    
  });
  
  // socket.io events
  
  socket.on('/chat', function( data ) {
    $.publish('/chat', [data])
  });
  
  socket.on('/log/server', function (data) {
    $.publish('/log/server', [data]);
  });
  
  socket.on('/event3', function (data){
    $.publish('/event3', [data]);
  });
});
