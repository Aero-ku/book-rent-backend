var express = require("express");
var globalConfig = require("./config");
var loader = require("./loader")
var app = new express();

app.use(express.static(globalConfig["page_path"]));

// 登录
app.get("/login", loader.get('/login'))

app.get("/findAll", loader.get("/findAll"));

app.get("/insertBooks", loader.get("/insertBooks"));

app.get("/deleteData", loader.get("/deleteData"));

app.get('/updateBooks', loader.get('/updateBooks'));

app.get('/getBookDetail', loader.get('/getBookDetail'));

// 收藏图书
app.get('/storeBook', loader.get('/storeBook'));

app.listen(globalConfig["port"]);