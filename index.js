var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader")
var app = new express();
var bodyParser = require("body-parser"); // 用于post请求

app.use(express.static(globalConfig["page_path"]));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// 登录
app.get("/login", loader.get('/login'))

app.get("/findAll", loader.get("/findAll"));

app.get("/insertBooks", loader.get("/insertBooks"));

app.get("/deleteData", loader.get("/deleteData"));

app.get('/updateBooks', loader.get('/updateBooks'));

app.get('/getBookDetail', loader.get('/getBookDetail'));

// 收藏图书
app.post('/storeBook', loader.get('/storeBook'));
// 取消收藏
app.post('/unStoreBook', loader.get('/unStoreBook'));

// 我的收藏
app.get('/myStore', loader.get('/myStore'));

// 获取用户收藏信息
app.get("/getStoredInfo", loader.get('/getStoredInfo'));

// 获取个人中心一栏信息
app.get('/getFirstInfo', loader.get('/getFirstInfo'));

// 加入借书架
app.post('/addToShelf', loader.get('/addToShelf'));

// 借书架中删除绘本
app.post('/deleteFromShelf', loader.get('/deleteFromShelf'));

// 借书架中删除多本绘本
app.post('/deleteMultiBook', loader.get('/deleteMultiBook'));

// 获取用户借书架信息
app.get('/shelfInfo', loader.get('/shelfInfo'));

// 开通会员
app.post('/openCard', loader.get('/openCard'));

// 获取会员信息
app.get('/getCardInfo', loader.get('/getCardInfo'));

// 分类图书结果页
app.get('/getSortData', loader.get('/getSortData'));

//支付订单
app.post('/payOrder', loader.get('/payOrder'));

// 订单信息
app.get('/orderInfo', loader.get('/orderInfo'));

// 修改订单信息
app.post('/modifyOrderInfo', loader.get('/modifyOrderInfo'));

app.listen(globalConfig["port"]);