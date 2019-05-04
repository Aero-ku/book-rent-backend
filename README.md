```
├── my-app-be
│   ├── README.md
│   ├── config.js
│   ├── index.js//路由
│   ├── node_modules
│   ├── package-lock.json
│   ├── package.json
│   ├── page
│   └── server.conf //服务器配置文件
```
express 是一个web层的框架，和数据库是没有关系的

loader.js -- 用于自动获取web层下所有的文件，让通用代码与业务代码分离。
index.js
loader.js
这三个都是架构逻辑的代码，里面不写业务代码

## 运行
```
node index.js
```