var searchDao = require("../dao/searchDao");

var path = new Map();

function findAll(request, response){
  searchDao.find("book_list", {},function(error, result){
    if(error == null){
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify(result));
      response.end();
    } else {
      console.log('error')
    }
  })
}
path.set("/findAll", findAll); // 请求与方法对应

// 获取图书详情
function getBookDetail(request, response){
  console.log('这是request.query的内容：',request.query)
  const id = parseInt(request.query.book_id)
  console.log('typeof', typeof id)
  searchDao.find("book_list", {book_id: id}, function(error, result){
    if(error == null) {
      console.log('result', result)
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify(result));
      response.end();
    } else {
      console.log('error')
    }
  })
}
path.set('/getBookDetail', getBookDetail);
module.exports.path = path;