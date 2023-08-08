const express = require('express');
const app = express();
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');

//middleware
app.use(express.json()); // req.body
app.use((req, res, next) => {
	res.locals.data = {};
	next();
});

app.use(logger('dev'));
app.use(favicon(path.join(__dirname, 'public', 'img', 'logo.png'))); // path.join is used so people with widows (etc... that use forward slashes) can use it
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/todos', require('./routes/api/todos')); // sets '/routes/api/todos' to '/api/todos'
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'public', 'index.html'));
}); // this will redirect user to index.html if they type a non-existent path in the URL

module.exports = app;
