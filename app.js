var express = require('express');
var app = express();
var req = require('request');
var port = process.argv[2] || 3000 ;
var host = 'localhost';
var http = require('http');

var peers = [];
var books = [];

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// app.get('/ping', (request, res) => {
//
//   var options = {
//     url: 'http://'+host+':'+3001+'/pong',
//     headers: {
//       'fromPort': port,
//       'customheader2': 'val2'
//     }
//   };
//
//   console.log("options", options)
//   var target = req.post( options, function(err,data){
//     console.log('uploaded with headers')
//   })
//   request.pipe(target);
//   // res.send(target);
//
// });

app.get('/ping', (req, res) => {
  http.get({
    hostname: 'localhost',
    port: 3001,
    path: '/pong',
    agent: false  // create a new agent just for this one request
  }, (res) => {
    // Do stuff with response
    console.log('sent out to 3001/pong')
  });
  res.send('sent to pong')
});



app.get('/pong', (req, res) => {
  console.log('fuck yeah here is req obj:', req.headers);

  http.get({
    hostname: 'localhost',
    port: 3000,
    path: '/pang',
    agent: false  // create a new agent just for this one request
  }, (res) => {
    // Do stuff with response
    console.log('sent out to 3001/pong')
  });

  res.send('hello world');
})

app.get('/pang', (req, res) => {
  console.log('fuck yeah here is req obj to PANG:', req.headers);

});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
