var deleteDao = require("../dao/utils");

var path = new Map()

var data = { id: 12341234 }

function deleteData(request, response){
  deleteDao.deleteData('book_list', data, function(error, result){
    if(error == null){
      response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify({code: 200, data: {}, msg: '删除成功！'}));
      response.end();
    } else {
      response.writeHead(500, {'Content-Type': 'text/html;charset=utf-8'});
      response.write(JSON.stringify({code: 500, data: {}, msg: ''}))
    }
  })
}
path.set('/deleteData', deleteData);

module.exports.path = path;