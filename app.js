var express = require('express');//框架
var path = require('path');//处理路径
var favicon = require('serve-favicon');//启动服务器的小图标
var logger = require('morgan');//打印日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');//转换代码

//引入两个JS文件，('路径/文件名省略后缀')
var index = require('./routes/index');
var users = require('./routes/users');
//自定义路由-login没有正常显示?
var login=require('./routes/login');
var register=require('./routes/register');//get请求
var registerpost=require('./routes/registerpost');//post请求
var getUserInfo=require("./routes/getUserInfo");

var app = express();//express()方法

// view engine setup设置静态资源
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//app.use--使用路由，use是适用第三方模块

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));//设置静态访问资源

app.use('/', index);//基础路由
app.use('/users', users);
app.use('/login',login);
app.use('/register',register);//get请求
app.use('/registerpost',registerpost);//post请求
app.use('/getUserInfo',getUserInfo);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
