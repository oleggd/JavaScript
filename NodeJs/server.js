const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine','hbs');

app.use((req, res,next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

//app.use((req,res,next) => {
//    res.render('maintenance.hbs');
//});

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/',(request,response) => {
    response.render('home.hbs',{
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome here'
    })
    // response.send({
    //     name: 'Oleg',
    //     likes : [
    //         'Biking',
    //         'Running'
    //     ]
    // });
});

app.get('/about',(request,response)=> {
    response.render('about.hbs',{
      pageTitle : 'About Page'
    });
});

app.get('/bad', (request,response) => {
    let errorMessage = 'Some error from express';
    response.send(errorMessage);
})
app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
});