var express = require('express');
var cors = require('cors');
var MongoAdapter = require('./mongoAdapter');
var bodyParser = require('body-parser');

const port = 8081;

var app = express();
app.use(cors());
app.use(bodyParser.json());

const chartData = require('./sampleData');

var mongoAdapter = new MongoAdapter();

app.listen(port, () => {
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
