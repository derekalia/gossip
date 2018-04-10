var express = require('express');
var app = express();
var req = require('request');
var port = process.argv[2] || 3000 ;
var targetPort = process.argv[3] || 3001 ;
var host = 'localhost';
var http = require('http');
var request = require('request')
var bodyParser = require('body-parser')



/* {
3000: {
port:3000,
uuid:
}
}
*/
var favBook = "Story"
var version = 0

//state of local gossip

let nodeState = {}

//object array
var peers = [];

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/bootstrap', (req, res) => {

request({
  url: 'http://localhost:'+targetPort+'/peers',
  method: 'POST',
  json: {fromPort: port}
}, function(error, response, body){
  console.log("body232", body);
  //save to peers
  peers.push(body);
});

res.send('wooot')
});


app.post('/peers', (req, res) => {
  //find the port from the req
  console.log(req.body.fromPort)
  //save in peers array
  peers.push(req.body.fromPort);
//send this back to the callback
  res.send(port)
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
