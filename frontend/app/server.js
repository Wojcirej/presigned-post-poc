const express = require('express');
const morgan = require('morgan');
const app = express();
const router = require('./../config/routes');
app.engine('.html', require('ejs').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

app.use(express.static(__dirname + '/static'));
app.use(morgan('combined'));

app.use('/', router);

module.exports = app;
