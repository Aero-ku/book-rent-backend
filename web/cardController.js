var dao = require("../dao/utils");

var path = new Map()

// 开通会员卡
function openCard(request, response) {
	const { userName, type } = request.body
	let startEffect = +new Date()
	let effectTime = 0
	switch (type) {
		case 'month': 
			effectTime = 2592000000
			break;
		case 'quarter':
			effectTime = 7776000000
			break;
		case 'year':
			effectTime = 31536000000
			break;
		default: ettectTime = 0;
	}
	let endEffect = startEffect + effectTime
	let obj = {
		start_effect: startEffect,
			effect_time: effectTime,
			end_effect: endEffect,
			card_status: 'valid'
	}
	dao.update("user_info", {user_name: userName}, 
		{$addToSet: {card: obj}
	}, function(error, result) {
		if(error === null) {
			response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'}),
			response.write('开通成功');
			response.end();
		}
	})
}

// 会员卡信息查询
function getCardInfo(request, response) {
	const { userName } = request.query
	dao.find("user_info", {user_name: userName}, function(error, result) {
		if (error === null) {
			const res = result[0].card[0]
			response.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
			response.write(JSON.stringify(res));
			response.end();
		}
	})
}

path.set('/openCard', openCard);

path.set('/getCardInfo', getCardInfo);

module.exports.path = path;