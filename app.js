const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
var cookies = require('cookie-parser');

app.use(cookies());

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);

 const work_router = require('./routes/works_routes');
 const user_router = require('./routes/user_routes');
 const view_router = require('./routes/view_routes');

 // Serving static files
 app.use('*/css',express.static('public/css'));
 app.use('*/js',express.static('public/js'));
 app.use('*/images',express.static('public/images'));
 app.use('*/img',express.static('public/img'));
 app.use('*/vendor',express.static('public/vendor'));
 app.use('*/assets',express.static('public/assets'));
 app.use('*/fonts',express.static('public/fonts'));
 app.use('*/scss',express.static('public/scss'));
 app.use('*/scripts',express.static('public/scripts'));
 app.use('*/styles',express.static('public/assets'));





 app.use(express.static(__dirname + '/public'));


 // Middlewares
 app.use(morgan('dev'));
 app.use(express.json());
 //app.use(express.static(`${__dirname}/public`));
 
//Routes
app.use('/',view_router)
app.use('/works', work_router);
app.use('/users', user_router);


// app.use((req, res, next) => {
//     console.log('Hello from Middleware');
//     next();
// });
app.use((req, res, next) => {
    //req.requesttime = new Date().toISOString();
    console.log(req.headers);
    next();
});
////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////
module.exports = app;