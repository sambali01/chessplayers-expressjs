const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use(express.static('static'));

// Routing betöltése
require('./route/index')(app);

app.use((err, req, res, next) => {
    res.end('Error happened...');
    console.log(err);
});

app.listen(3000, () => {
    console.log('Running on :3000');
});