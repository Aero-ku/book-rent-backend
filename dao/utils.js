var mongo = require('mongodb').MongoClient;

var url = "mongodb://127.0.0.1:27017/rental";

// 插入
function insert(collection, obj, callback){
  mongo.connect(url, {useNewUrlParser: true}, function(error, db){
    if(error == null) {
      var database = db.db('rental')
      // var obj = {name: 'dog', age: '22', sex: 1}
      database.collection(collection).insertOne(obj, callback);
      db.close();
    } else {
    }
  })
}

// 批量插入
function insertMany(collection, objs, callback){
  mongo.connect(url, {useNewUrlParser: true}, function(error, db){
    if(error == null){
      var database = db.db('rental');
      database.collection(collection).insertMany(objs, callback);
      db.close()
    } else {
    }
  })
}

// 修改
function update(collection, where, update, callback) {
  mongo.connect(url, {useNewUrlParser: true}, function(error, db){
    if(error == null){
      var database = db.db('rental');
      database.collection(collection).updateOne(where, update, callback);
      db.close();
    } else {
      console.log(error)
    }
  })
}

// 查询
function find(collection, where, callback) {
  mongo.connect(url, {useNewUrlParser: true}, function(error, db) {
    if(error == null){
      var database = db.db('rental');
      database.collection(collection).find(where).toArray(callback)
      db.close();
    } else {
      console.log(error)
    }
  })
}

// 删除
function deleteData(collection, where, callback){
  mongo.connect(url, {useNewUrlParser: true}, function(error, db){
    if(error == null){
      var database = db.db('rental');
      database.collection(collection).deleteOne(where, callback);
      db.close();
    } else {
      console.log(error)
    }
  })
}

module.exports.insert = insert
module.exports.update = update
module.exports.deleteData = deleteData
module.exports.find = find
module.exports.insertMany = insertMany
// insertMany("book_list", [{name: 'huahua', age: 20, sex: 1}, {name: 'meimei', age: 18, sex: 0}], function(error, res){
//   if(error == null){
//     console.log("ok");
//   } else {
//     console.log('error')
//   }
// })

// update("student", {name: 'meimei'}, {$set: {age: 19}}, function(error, result){
//   if(error == null){
//     console.log('ok');
//   } else {
//     console.log('error');
//   }
// })

// deleteData('student', {age: 20}, function(error, res){
//   if(error == null){
//     console.log('ok')
//   } else {
//     console.log('error')
//   }
// })

// find("book_list", {book_id: '3'}, function(error, res){
//   if(error == null){
//     console.log(res);
//   } else {
//     console.log(error);
//   }
// })


