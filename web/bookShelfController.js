var dao = require("../dao/utils");

var path = new Map()

//加入借书架
function addToShelf(request, response){
	console.log('request.body', request.body)
	const { book, user_name } = request.body
	dao.update("user_info", {user_name: user_name}, {$addToSet: {user_borrow: book}}, function(error, result){
		if(error === null){
			response.writeHead(200, { "Content-Type": 'text/html;charset=utf-8'})
			response.write('加入成功！');
			response.end();
		} else {
			console.log(error);
		}
	})
}

// 查询用户的借书架信息
function shelfInfo(request, response){
	console.log('resquest.query', resquest.query)
	const { user_name } = resquest.query
	dao.find("user_info", {user_name: user_name}, function(error, result){
		if (error === null) {
			response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
			response.write(JSON.stringify(result));
			response.end();
		} else {
			console.log('error')
		}
	})
}

path.set('/addToShelf', addToShelf);
path.set('/shelfInfo', shelfInfo);

module.exports.path = path;