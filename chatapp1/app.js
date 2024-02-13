require ('./database.js')
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const ejs = require('ejs')
const logger = require('morgan')
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/authRoutes')
const chatRouter = require('./routes/chatRoutes');
const { tokenValidation } = require('./services/forgetPassword/tokenValidation.js');
const logMiddleware =require('./services/auth/loggerr/logMiddeleware')
const app = express();
const server = http.createServer(app);  
const io = socketIo(server); 
//const bodyParser = require('body-parser')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('forgetPassword', { title: 'My EJS Page', message: 'Hello, EJS!' });
});


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.use(logMiddleware);



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/',authRouter);
app.use('/', chatRouter);


require('./soket/chatSocket')(io); // Import and configure chatSocket module

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.error(err.stack);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports =  app , server , io ; 