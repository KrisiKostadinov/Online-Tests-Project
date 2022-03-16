const express = require('express');
const dotenv = require('dotenv').config();
const { engine } = require('express-handlebars');
const handlebars = require('handlebars');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

require('./config/db');

app.use(express.static('public'));

handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
    console.log(arg1, arg2);
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
});

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', require('./routes/indexRoutes'));
app.use('/users', require('./routes/usersRoutes'));
app.use('/categories', require('./routes/categoryRoutes'));
app.use('/tests', require('./routes/testsRoutes'));
app.use('*', (req, res) => res.render('404'));

app.listen(port, () => console.log('Server started on port: ' + port));