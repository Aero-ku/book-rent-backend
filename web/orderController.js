var dao = require("../dao/utils");

var path = new Map()

// 支付订单
function payOrder(request, response) {
	const { timeStamp, orderTime, userName, orderContent, orderMoney, orderStatus, phone, address, receiver } = request.body
	const orderInfo = {
		order_id: timeStamp,
		order_time: orderTime,
		receiver: receiver,
		order_content: orderContent,
		order_money: orderMoney,
		order_status: orderStatus,
		address: address,
		phone: phone,
	}
	dao.update("user_info", {user_name: userName}, {$addToSet: {orders: orderInfo }}, function(error, result){
		if (error === null) {
			response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
			response.write('');
			response.end()
		} else {
			console.log(error)
		}
	})
}

path.set('/payOrder', payOrder);

// 查询订单信息

function  orderInfo(request, response) {
	const { userName } = request.query
	dao.find("user_info", { user_name: userName}, function(error, result) {
		if (error === null) {
			response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
			response.write(JSON.stringify(result[0].orders));
			response.end();
		}
	})
}

path.set("/orderInfo", orderInfo);

// 修改订单信息
function modifyOrderInfo(request, response) {
	const {userName, orderId, status } = request.body
	console.log('orderId:', orderId, "status:", status)
	dao.update("user_info", { user_name: userName, "orders.order_id": orderId}, 
	{$set: {"orders.$.order_status": status}}, function(error, result) {
		console.log('error', error, error === null)
		if (error === null) {
			response.writeHead(200, {"Content-Type": "text/html;charset=utf-8"})
			response.write('修改成功！');
			response.end();
		}
	})
}

path.set("/modifyOrderInfo", modifyOrderInfo)
module.exports.path = path;