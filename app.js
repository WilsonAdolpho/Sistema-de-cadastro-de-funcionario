var session = require('express-session')
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: '123',
  cookie: {maxAge: 2 * 60 * 1000},
  resave: false,
  saveUninitialized: false
}))//aqui





var loginRouter = require('./routes/func')
var cadastroRouter = require('./routes/func')
var listagemRouter = require('./routes/func');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

app.use('/', loginRouter);
app.use('/cadastro', cadastroRouter);
app.use('/listagem', listagemRouter); //rotas a cima

app.use(passport.initialize())//video de 20 minutos
app.use(passport.session())

let dao = require('./database/dao')
passport.serializeUser( function(user, done){
  done(null, user.id)
})
passport.deserializeUser( function(id, done){
dao.findById(id)
.then(([rows])=>{
  let user = rows[0]
  return done(null, user)
}).catch(err=>{
  return done(err, null)
})
})//continuação a cima

let strategyConfig = {
  usernameField: 'username',
  passwordField: 'password'
}
passport.use(new LocalStrategy(strategyConfig, function(username, password, done){
  dao.findByUsername(username)
  .then(([rows])=>{
    if (rows.length == 0)return done(null, false)
    let user = rows[0]
    if(user.password != password) return done(null, false)
    else return done(null, user)
  }).catch(err =>{
    console.log(err)
    return done(err, null)
  })
}))


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