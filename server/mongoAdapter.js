var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;

module.exports = class MongoAdapter{

  constructor(){}

  connectDB(connectDBCallback){
    var self = this;
    let url = `mongodb://localhost:27017/EchartSampleData`;
    MongoClient.connect(url, function(err, db){
      !err && (self.db = db);
      connectDBCallback && connectDBCallback(err, db);
    });
  }

  getDbInstance(getDbInstanceCallback){
    var self = this;
    switch(true){
      case !!self.db:
        getDbInstanceCallback(null, self.db);
        break;
      case !self.db:
        self.connectDB(getDbInstanceCallback.bind());
        break;
    }
  }

  insertMany(collectionName, documents, callback){
    var self = this;
    self.getDbInstance((err, db) => {
      err && callback(err);
      if(!err){
        var collection = db.collection(collectionName);
        collection.insertMany([...documents], function(err, result) {
         callback(err, result);
        });
      }
    });
  }

  getRecords(collectionName = "", query = {}, callback){
    var self = this;
    self.getDbInstance((err, db) => {
      var collection = db.collection(collectionName);
      collection.find(query).toArray(function(err, docs) {
        callback(err, docs);
      });
    });
  }

  getRecord(collectionName = "", query = {}, callback){
    var self = this;
    self.getDbInstance((err, db) => {
      var collection = db.collection(collectionName);
      collection.findOne(query, function(err, doc) {
        callback(err, doc);
      });
    });
  }

  updateRecord(collectionName = "", query, record, callback){
    var self = this;
    self.getDbInstance((err, db) => {
      var collection = db.collection(collectionName);
      collection.updateOne(query, {$set: record}, function(err, result) {
        !err && self.getRecord(collectionName, query, function(err, result){
          callback(err, result);
        });
        err && callback(err, result);
      });
    });
  }

  deleteRecords(collectionName = "", query = {}, callback){
    var self = this;
    self.getDbInstance((err, db) => {
      var collection = db.collection(collectionName);
      collection.deleteMany(query, function(err, result) {
        callback(err, result);
      });
    });
  }

}
