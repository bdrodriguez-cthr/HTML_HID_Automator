var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var multer = require('multer');

//Multer file upload setup
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/images/uploads');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname + path.extname(file.originalname));
  }
});

var upload = multer({ storage: storage });

//express setup
var app = express();
app.use("/public", express.static('./public/'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//ROUTES
app.get('/', function(req, res) {
  res.render('index', { title: 'HID Automator' });
});

app.post('/preview', upload.array('images-input'), function(req, res) {
  //Handle Image uploads
    //Make sure to pass the files to the client below
  req.files.forEach(function(file) {
    console.log(file.originalname);
  });

  //Handle address data
  var csvText = req.body["address-data"];
  var rows = csvText.split(";");

  var parsedData = [];

    //Create Columns
  rows.forEach(function(row) {
    var rowArray = row.split(",");
    parsedData.push(rowArray);
  });
  
    //Clean up data
  parsedData.pop()
  parsedData.forEach(function(row) {
    row.pop();
  });
  for(var i = 0; i < parsedData.length - 1; i++) {
    parsedData[i+1][0] = parsedData[i+1][0].trim();
  }
  
  res.render('preview', {data: parsedData, files: req.files});  
});







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

app.listen(3000, () => console.log(`Example app listening on port 3000!`));
module.exports = app;
