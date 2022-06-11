var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var session = require('express-session');
var app = express();


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', indexRouter);
app.use('/users', usersRouter);

const data= [
  {
    id: 1,
    name: 'test 1',
    address: 'khizanishvili',
  },
  {
    id: 2,
    name: 'test 2',
    address: 'khizanishvili',
  },
  {
    id: 3,
    name: 'test 3',
    address: 'khizanishvili',
  },
  {
    id: 4,
    name: 'test 4',
    address: 'khizanishvili',
  },
  {
    id: 5,
    name: 'test 5',
    address: 'khizanishvili',
  }

]
let carts =[];
app.get('/', (req, res, next)=>{
  let carts=req.session.cart;
  res.render('index',{
    data,
    carts,
})

})
app.post('/add/:id', (req,res, next)=>{
let item = data.find(a=> a.id==req.params.id);
if(!req.session.cart) req.session.cart= [];
req.session.cart.push(item);
res.redirect('/');

});
app.post('/remove/:id', (req,res, next)=>{
  let carts1 =req.session.cart.filter(a=> a.id !=req.params.id);
  req.session.cart=carts1;
  res.redirect('/');
  
  })
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

module.exports = app;
