var dao = require("../dao/utils");

var path = new Map()

function login(request, response){
  const { user_id, user_name, province, city } = request.query
  dao.find("user_info", {user_name: user_name}, function(error, result){
    if(error == null){
      if(result.length){
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        response.write(JSON.stringify(result));
        response.end();
      } else {
        dao.insert("user_info", {user_id: user_id, user_name: user_name, province: province, city: city}, function(error, result){
          if (error == null) {
            console.log('result', result)
            response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            response.write('登录成功！2');
            response.end()
          } else {
            console.log('error')
          }
        })
      }
    } else {
      console.log('error')
    }
  })
}
path.set('/login', login);

function getUserInfo(request, response){
  const { user_name } = request.query
  dao.find("user_info", { user_name: user_name }, function(error, result){
    if (error === null) {
      if (result.length) {
        response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
        response.write(JSON.stringify(result));
        response.end();
      }
    }
  })
}
path.set('/getUserInfo', getUserInfo);

module.exports.path = path;