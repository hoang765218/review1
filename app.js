var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//Dang ky router emp
var bookRouter = require('./routes/book');

var app = express();
//ket noi mongodb
const mongoose = require('mongoose');
//mvhoang765218     hoang765218
//mongodb+srv://mvhoang765218:<db_password>@cluster0.2kou2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
mongoose
  .connect('mongodb+srv://mvhoang765218:hoang765218@cluster0.2kou2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(`Error: ${err}`));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
//Su dung router
app.use('/book', bookRouter);
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
// Tìm kiếm sản phẩm
// router.get('/search', async (req, res) => {
//   const { name } = req.query;   //lấy name từ URL ví dụ URL: https://example.com/search?name=sofa thường với các yêu cầu GET
//   const query = name ? { name: { $regex: name, $options: 'i' } } : {}; // Tìm kiếm theo tên , option 'i' là không yêu cầu chữ hoa hoặc chữ thường

//   try {
//       const products = await Product.find(query);
//       res.render('product/index', { products, name }); // Truyền name về phía client để hiển thị trong input
//   } catch (err) {
//       console.log(err);
//       res.status(500).send('Error searching products');
//   }
// });

module.exports = app;
