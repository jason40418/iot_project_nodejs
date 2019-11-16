const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const fs = require('fs');
const ini = require('ini');
const config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'));

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

// Database
const mysql = require("mysql");
const con = mysql.createConnection({
  host: config.database.host,
  port: config.database.port,
  user: config.database.user,
  password: config.database.password,
  database: config.database.database,
  charset: config.database.charset
});

con.connect(function (err) {
  if (err) {
    console.log("Connecting Error");
    return;
  }
  console.log("Connecting Success");
});

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// 網頁伺服器連接埠
server.listen(config.host.port);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.con = con;
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

const handleRegister = require('./controllers/socket/main');
io.on('connection', function (client) {
  handleRegister(client);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
