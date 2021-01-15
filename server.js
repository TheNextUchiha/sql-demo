const express = require('express');
const _ = require('lodash');
const hbs = require('hbs');

const index = require('./routes/index');

const app = express();

//Handlebars Setup
app.set('view engine','hbs');

// Express configs
app.use(express.urlencoded({extended: false}));     // To Parse URL data
app.use(express.json());                            // To Parse JSON data
app.use(express.static(__dirname + '/views'));      // To include static CSS files
app.use('/', index);

// HBS Helpers
hbs.registerHelper('returnstatus', function(data) {
    if(data === 1) return 'Active';
    else return 'Inactive';
});

// Server listener
app.listen(8000, () => {
    console.log('Server is up at port 8000');
});