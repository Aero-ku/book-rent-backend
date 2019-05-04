var dao = require("../dao/utils");

var path = new Map()

// 收藏图书
function storeBook(request, response){
  const { user_name, book_id } = request.query
  dao.update("user_info", {user_name: user_name}, {$addToSet: {user_store: book_id}}, function(error, result){
    if(error === null){
      response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8'})
      response.write('收藏成功！');
      response.end();
    } else {
      console.log('error');
    }
  });
}

path.set('/storeBook', storeBook)

//取消收藏图书
function unStoreBook(request, response) {
  const { user_name, book_id } = request.query
  dao.update("user_info", {user_name: user_name}, {$pull: {user_store: book_id}}, function(error, result){
    if(error === null) {
      response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8'})
      response.write('取消收藏成功！');
      response.end();
    } else {
      console.log('error');
    }
  })
}

path.set('/unStoreBook', unStoreBook);
module.exports.path = path;
