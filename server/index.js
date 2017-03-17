var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var io = require('socket.io');
var http = require('http');

var MongoAdapter = require('./mongoAdapter');

const chartData = require('./sampleData');
const port = 8081;
var mongoAdapter = new MongoAdapter();

var app = express();
app.use(cors());
app.use(bodyParser.json());
var server = http.createServer(app);

//Socket connection
io(server).on('connection', function(socket){
  console.log('user connected', socket.id);
  emitData(0, socket);
  socket.on('disconnect', function(){
    console.log('user disconnected', socket.id);
    delete socket;
  });
});

server.listen(port, () => {
  console.log(`Server started listening on port: ${port}`)
})

app.get('/insert-char-data', (req, res) => {
  mongoAdapter.insertMany('chartData', chartData, function(err, result){
    err && res.status(500).json({"error": true, "message": err});;
    !err && res.json(result);
  });
});

app.get('/chartData', (req, res) => {
  mongoAdapter.getRecords('chartData', {}, (err, result) => {
    err && res.status(500).json({"error": true, "message": err});;
    !err && res.json(result);
  });
});

app.put('/requests/:id', (req, res) => {
  mongoAdapter.updateRecord('requests', {id: parseInt(req.params.id)}, req.body.data, (err, result) => {
    err && res.status(500).json({"error": true, "message": err});
    result && res.status(202).json({success: true, request: result });
  });
});

app.delete('/requests/:id', (req, res) => {
  mongoAdapter.deleteRecords('requests', {id: parseInt(req.params.id)}, (err, result) => {
    err && res.status(500).json({"error": true, "message": err});
    !err && (result.deletedCount > 0 ) && res.status(202).json({success: true, deleted: result.deletedCount});
    !err && (result.deletedCount === 0 ) && res.status(500).json({success: false, deleted: result.deletedCount});
  });
});


//Mockup of a live data
var nameArray = ["Analytical Balance", "AFS", "other", "Bioreactor", "Analytical", "Balance", "New", "Marlabs", "React", "Angular"];
var valueArray = [2000, 400, 1500, 2600, 700, 1850, 6250, 4204, 3250, 5214];
var nameIndex = 0;
var indexToFind = 0;
getName = (posIndex) => {
  var index = indexToFind + parseInt(posIndex);
  return index <= nameArray.length-1 ? nameArray[index] : nameArray[index - (nameArray.length-1)];
}
getValue = (posIndex) => {
  var index = indexToFind + parseInt(posIndex);
  (posIndex === 3) && indexToFind++;
  (indexToFind > valueArray.length - 1) && (indexToFind = 0);
  return index <= valueArray.length - 1 ? valueArray[index] : valueArray[index - (valueArray.length-1)]
}
function emitData(timeout = 1000, socket){
  setTimeout(() => {
    var timeStamp = new Date().getTime();
    let result = {
      timeStamp: timeStamp,
      data: [
        {
          name: getName(0),
          value: getValue(0)
        },
        {
          name: getName(1),
          value: getValue(1)
        },
        {
           name: getName(2),
           value: getValue(2)
         },
         {
           name: getName(3),
           value: getValue(3)
         }
      ]
    };
    socket.emit('chartData', result, function(ackTimeStamp){
      emitData(3000, socket);
    });
  }, timeout);
}
