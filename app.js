var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var models = require('./models');
var session = require('express-session'); // <--- Add this code to your declarations
var cors = require('cors');

var port = 3001;


var app = express();


app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//not used
//app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'perilous journey' }));
//do we need passport when auth?

const prefix = '/';
//!registering all the endpoints here!
app.use(prefix, require('./routes/admin'));
app.use(prefix, require('./routes/users'));
app.use(prefix, require('./routes/posts'));
app.use(prefix, require('./routes/comments'));
app.use(prefix, require('./routes/contactUs'));



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
  res.send('error');
});

//debating to use sync or migrations
//https://stackoverflow.com/questions/21105748/sequelize-js-how-to-use-migrations-and-sync

//when we change models we have to manual adjust the db
var flip = false;

if (!true) models.sequelize.sync({ alter: !flip, force: flip }).then(function () {
  console.log("DB Sync'd up")
});



app.listen(port, () => {
  console.log("Server listening on port " + port);
});




module.exports = app;
