var express = require('express');
var app = express();
var port = 3000;



app.use('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => {
  console.log('Server listening on port ' + port);
});
