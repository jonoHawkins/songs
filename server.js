var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    routes = require('./app/routes'),

    app = express();

app.use(bodyParser.urlencoded());
// we are specifying the html directory as another public directory
app.use(express.static(path.join(__dirname, 'www/')));
// set view folder path
app.set('views', path.join(__dirname, 'app/views'));
// set rendering engine to ejs --- allows staight up HTML -- will change this later
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use('/', routes);

var server = app.listen(1337, function () {
    var host = server.address().address,
        port = server.address().port;

    console.log("Songs server litening at http://%s:%s", host, port);
});