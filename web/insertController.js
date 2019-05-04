var insertManyDao = require("../dao/utils");

var path = new Map()

// var dataArray = [{
//     id: 276,
//     image: 'https://imagenew.qujie8.com//uploads/20170626162107-5950c3f3481ca.jpg',
//     name: '《精灵鼠—在月亮上跳高》'
//   }, {
//     id: 62,
//     image: 'https://imagenew.qujie8.com//uploads/20170621154446-594a23ee18312.jpeg',
//     name: '《“小时候”中国图画书—小金鱼儿》'
//   }]

function insertBooks(request, response){
  insertManyDao.insertMany('book_list', dataArray, function(error, result){
    if(error == null){
      response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify(result));
      response.end();
    } else {
      console.log('error');
    }
  })
}
path.set('/insertBooks', insertBooks);

module.exports.path = path;