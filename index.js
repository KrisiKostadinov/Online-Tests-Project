const express = require('express');
const { engine } = require('express-handlebars');
const app = express();
const port = process.env.PORT || 3000;

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');

app.use('/', require('./routes/indexRoutes'));

app.listen(port, () => console.log('Server started on port: ' + port));