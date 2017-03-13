var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var io = require('socket.io');

var MongoAdapter = require('./mongoAdapter');

const port = 8081;

var app = express();
app.use(cors());
app.use(bodyParser.json());
var server = require('http').createServer(app);


//Mockup of a live data
var nameSpaceArray = ["Analytical Balance", "AFS", "other", "Bioreactor", "Analytical", "Balance", "New", "Marlabs", "React", "Angular"];
var valueArray = [2000, 400, 1500, 2600, 700, 1850, 6250, 4204, 3250, 5214];
var nameSpaceIndex = 0;
var indexToFind = 0;
getRandomNameSpace = (posIndex) => {
  var index = indexToFind + parseInt(posIndex);
  return index <= nameSpaceArray.length-1 ? nameSpaceArray[index] : nameSpaceArray[index - (nameSpaceArray.length-1)];
}
getRandomNumber = (posIndex) => {
  var index = indexToFind + parseInt(posIndex);
  (posIndex === 3) && indexToFind++;
  (indexToFind > valueArray.length - 1) && (indexToFind = 0);
  if(index <= valueArray.length - 1){
    return valueArray[index];
  }
  else{
    index -= (valueArray.length-1)
  }
  return valueArray[index];
}

io(server).on('connection', function(socket){
  console.log('user connected');
  let result = [
    {
      name: "Analytical Balance",
      value: 2400
    },
    {
      name: "AFS",
      value: 4567
    },
    {
       name: "other",
       value: 800
     },
     {
       name: "Bioreactor",
       value: 2000
     }
  ]
  socket.emit('chartData', result);
  function emitData(timeout = 1500){
    setTimeout(() => {
      let result = [
        {
          name: getRandomNameSpace(0),
          value: getRandomNumber(0)
        },
        {
          name: getRandomNameSpace(1),
          value: getRandomNumber(1)
        },
        {
           name: getRandomNameSpace(2),
           value: getRandomNumber(2)
         },
         {
           name: getRandomNameSpace(3),
           value: getRandomNumber(3)
         }
      ]
      socket.emit('chartData', result);
      console.log('Emitting socket data', new Date().getTime());
      emitData(parseInt(Math.random() * 1000));
    }, timeout);
  }
  emitData(parseInt(Math.random() * 1000));
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

const chartData = require('./sampleData');

var mongoAdapter = new MongoAdapter();

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
