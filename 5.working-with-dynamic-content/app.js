const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');

const app = express();

//app.engine('handlebars', expressHbs({ layoutsDir: 'views/layouts/', defaultLayout: 'main-layout' })); 
//layoutsDir by default  is set to views/layouts/ and it takes by default .handlebars extension otherwise we have to specify extname value
//to register a new templating engine, this is done in the case we are not using the built in engine, pug was kind of built in engine express handlebars isn't. exoressHbs() returns the initialised view engine which we can assign to engine here.

app.set('view engine', 'ejs');
//app.set('view engine', 'handlebars');
//app.set('view engine', 'pug'); //set any value globally on our express application
// we are able to read the value using the get method

app.set('views', 'views') //by default the views ar looked inside the /views folder we can explicitly tell express to look for the views inside a different folder.

//View Engine allows us to tell express that for any dynamic templates we are trying to render please  use this engine we're registering here and view allows us tot tell express where to find these dynamic views

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes.routes);

app.use((req, res, next) => {
    // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', { pageTitle: 'Page Not Found!', path: '/error' });
});


app.listen(3000);
