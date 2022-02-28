const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
    res.status(200).send({test:"Server is running ..... "});
});
app.get('/ons', (req, res) => {
    res.status(200).send({test:"hello from the other side :D"});
});


app.listen(8080);
console.log('listening on port ',port);