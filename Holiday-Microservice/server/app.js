const express = require('express'),
    path = require('path');

const app = express();

app.use('/api/holidays', require('./routes/holidays'));

app.get('/', express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("Express server listening on port " + port);
});
