const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');


const app = express();


app.set('view engine', 'pug'); //set any value globally on our express application
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
    res.status(404).render('404', { pageTitle: 'Page Not Found!' });
});


app.listen(3000);
