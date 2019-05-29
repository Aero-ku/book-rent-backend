var dao = require("../dao/utils");

var path = new Map()

//绘本加入借书架
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

// 借书架删除绘本
function deleteFromShelf(request, response) {
	const { user_name, book_id } = request.body
	dao.update("user_info", {user_name: user_name}, {$pull: {user_borrow: { book_id: book_id} } }, function(error, result) {
		if(error === null) {
			console.log(result)
			response.writeHead(200, {"Content-Type": "text/html;charset=utf-8" })
			response.write("删除成功！")
			response.end();
		}
	})
}
// 借书架删除多本绘本（一般时下单时将已下单的绘本删除）
function deleteMultiBook(request, response) {
	const {userName, bookArr } = request.body
	console.log('bookArr', bookArr)
	bookArr.forEach((item, index) => {
		dao.update("user_info", {user_name: userName}, {$pull: {user_borrow: { book_id: item} }}, function(error, result) {
			if (error === null) {
			}
		})
	})
	response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
	response.write('删除成功！');
	response.end();
}

// 查询用户的借书架信息
function shelfInfo(request, response){
	const { user_name } = request.query
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
path.set('/deleteFromShelf', deleteFromShelf);
path.set('/deleteMultiBook', deleteMultiBook);
path.set('/shelfInfo', shelfInfo);

module.exports.path = path;