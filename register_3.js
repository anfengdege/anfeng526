var express = require("express");
var router= express.Router();
var queryString = require("querystring");
var fs = require("fs");
// 中间件
var MongoClient = require("mongodb").MongoClient; // 第一步
// 数据库的端口

var DB_CONN_STR = 'mongodb://localhost:27017/students'; //数据库名称 // 第二步

router.get("/",function (req,res,next) {
	 res.render("register",{
			 'title': '注册页面',
			 userName:"账号",
			 passWord:"密码",
			 success:false,
			 nickname:"昵称",
 			 confirmpw:"确认密码"
			})
});

router.post("/",function (req,res,next) {
	 // get 请求头 req  header
	 // post 请求体 req body
	 var data = req.body;
	 // 设置数据的方法
	
	// connect 链接中间件的方法  
	// DB_CONN_STR 数据库的端口 
	MongoClient.connect(DB_CONN_STR,function (err,db) { //第三步 设置数据库连接
		 	 if(err){
		 	 	console.log(err+"链接数据库失败")
		 	 }else{
		 	 	console.log("打开数据库成功")
		 	 	insertData(db,function (result) { // 数据库里插入数据的方法 //回调函数 == callback
		 	 		console.log(result)
					  res.redirect("/login")
		 	 		db.close(); // 关闭数据库 
		 	 	})
		 	 }
	})

	 var insertData = function(db,callback){ // 第四部  最后看这里
	 	 var conn = db.collection("boy")// 链接数据库的集合名称
	 	 // conn当前的数据库，conn.insert 数据库里执行插入代码
	 	 conn.insert(data,function (err,result) {
	 	 	 if(err){
	 	 	 	console.log(err);
	 	 	 	return 
	 	 	 }else{
	 	 	 	callback(result) 
	 	 	 }
	 	 })
	 }

});


module.exports = router;