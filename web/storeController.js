var dao = require("../dao/utils");
var bodyParser = require("body-parser"); // 用于post请求

var path = new Map()

// 收藏图书
function storeBook(request, response){
  console.log('request.body',request.body)
  const { user_name, book_id } = request.body
  dao.update("user_info", {user_name: user_name}, {$addToSet: {user_store: book_id}}, function(error, result){
    if(error === null){
      response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8'})
      response.write('收藏成功！1');
      console.log('收藏result', result)
      response.end();
    } else {
      console.log('error');
    }
  });
}

path.set('/storeBook', storeBook);

//取消收藏图书
function unStoreBook(request, response) {
  console.log('unStoreBook-request.body', request.body)
  const { user_name, book_id } = request.body
  dao.update("user_info", {user_name: user_name}, {$pull: {user_store: book_id}}, function(error, result){
    if(error === null) {
      response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8'})
      response.write('取消收藏！2');
      response.end();
    } else {
      console.log('error');
    }
  })
}

path.set('/unStoreBook', unStoreBook);

// 获取收藏信息 *** mongodb强大的查询语句
function myStore(request, response) {
  const { userName } = request.query
  console.log('userName', userName)
  dao.find("user_info", {user_name: userName}, function(error, result) {
    if (error === null) {
      const storeArr = result[0].user_store
      dao.find("book_list", {book_id: {$in: storeArr}}, function(error, result) {
        if (error=== null) {
          console.log('result', result);
          response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
          response.write(JSON.stringify(result));
          response.end();
        }
      })
    }
  }) 
}

path.set('/myStore', myStore);

function getStoredInfo(request, response) {
  const { user_name } = request.query
  dao.find("user_info", {user_name: user_name}, function(error, result) {
    if(error === null) {
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify(result));
      response.end();
    }
  })
}

path.set('/getStoredInfo', getStoredInfo);

module.exports.path = path;
