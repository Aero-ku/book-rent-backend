var updateDao = require("../dao/utils");

var path = new Map()

var newData = { name: '《hahaha》'}

function updateBooks(request, response){
    updateDao.update('book_list', {id: '276'}, newData, function(error, result){
        if(error == null){
            response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' });
            response.write(JSON.stringify({code: 200, msg: '更新成功'}))
            response.end();
        } else {
            response.writeHead(500, { 'Content-Type': 'text/html;charset=utf-8' });
            response.write(JSON.strinfify({code: 500, msg: '更新失败'}))
            response.end();
        }
    })
}

path.set('/updateBooks', updateBooks);

module.exports.path = path;