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
  const id = parseInt(request.query.book_id)
  searchDao.find("book_list", {book_id: id}, function(error, result){
    if(error == null) {
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify(result));
      response.end();
    } else {
      console.log('error')
    }
  })
}

path.set('/getBookDetail', getBookDetail);

// 获取用户收藏信息
function getStoreInfo(request, response){
  const { user_name } = request.query
  console.log('user_name', user_name)
  searchDao.find("user_info", {user_name: user_name}, function(error, result){
    if (error === null) {
      console.log('store info:', result)
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify(result));
      response.end();
    } else {
      console.log('error');
    }
  })
}

path.set('/getStoreInfo', getStoreInfo);

//  获取个人中心一栏信息
function getFirstInfo(request, response){
  const { user_name } = request.query
  searchDao.find("user_info", { user_name: user_name }, function(error, result){
    if (error === null) {
      if (result.length) {
        let res = {}
        res.storeNum = result[0].user_store.length
        res.score = result[0].score
        res.couponNum = JSON.parse(result[0].coupon).length
        res.cardNum = JSON.parse(result[0].card).length
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        response.write(JSON.stringify(res));
        response.end();
      }
    }
  })
}
path.set('/getFirstInfo', getFirstInfo);


module.exports.path = path;