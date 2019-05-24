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

// 获取用户图书收藏信息
app.get('/getStoreInfo', loader.get('/getStoreInfo'));

// 获取个人中心一栏信息
app.get('/getFirstInfo', loader.get('/getFirstInfo'));

// 加入借书架
app.post('/addToShelf', loader.get('/addToShelf'));

// 借书架中删除绘本
app.post('/deleteFromShelf', loader.get('/deleteFromShelf'));

// 获取用户借书架信息
app.get('/shelfInfo', loader.get('/shelfInfo'));

// 分类图书结果页
app.get('/getSortData', loader.get('/getSortData'));

app.listen(globalConfig["port"]);