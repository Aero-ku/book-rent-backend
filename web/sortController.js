var searchDao = require("../dao/searchDao");

var path = new Map()

// 获取分类图书页
function getSortData(request, response) {
	const type = parseInt(request.query.type)
	searchDao.find("book_list", {type: type}, function(error, result){
		if(error == null){
			response.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8'});
			console.log(result)
			response.write(JSON.stringify(result));
			response.end();
		} else {
			console.log('error');
		}
	})
}

path.set('/getSortData', getSortData);

module.exports.path = path;