const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
var jsonServer = require('json-server');
const logger = require('morgan');
// const passport = require('passport');
// const connectDB = require('./utils/dbConnection');
// const { validateJwt } = require('./utils/jwtUtils');

// const bookRouter = require('./routes/book');
// const authRouter = require('./routes/auth');
const schemaValidator = require('./utils/validator');


const app = express();
// connectDB();

// passport.use(validateJwt);

app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/dist')));

// api routes
app.use('/api', jsonServer.router('db.json'));
// app.use('/api', schemaValidator, bookRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/'));
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
