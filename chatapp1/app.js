require ('./database.js')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const http = require('http');
const socketIo = require('socket.io');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoutes')
const chatRouter = require('./routes/chatRoutes')

const app = express();
const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach Socket.io to the server

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',authRouter);
app.use('/', chatRouter);

// Socket.io configuration for real-time chat
require('./soket/chatSocket')(io); // Import and configure chatSocket module

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports =  app , server , io ; // Export app, server, and io for use in other parts of your application
