
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , app = module.exports = express.createServer()
  , io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(require('stylus').middleware({ src: __dirname + '/public' }));
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});


// socket io stuff
io.sockets.on('connection', function (socket) {
  
  socket.on('/event2', function (data) {
    console.log("/event2: " + data.message);
    socket.emit('/log/server', data);
  });
  
  socket.on('/event3', function(data){
    console.log("/event3: " + data.message);
    socket.emit('/event3', data)
    socket.emit('/log/server', data);
  });
  
});

// Routes

app.get('/', routes.index);

var port = process.env.PORT || 3000;
app.listen(port);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
