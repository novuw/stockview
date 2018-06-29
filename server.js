// server.js
// where your node app starts

// init project
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
  
});
io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('add', function(msg){
        console.log('message: ' + msg);
        io.emit('add', msg);
     });
    socket.on('delete', function(){
        console.log('delete');
        io.emit('delete');
     });
    socket.on('disconnect', function(){
        console.log('user disconnected');
  });
});



// listen for requests :)
var listener = http.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
