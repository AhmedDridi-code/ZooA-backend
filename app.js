const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
    res.status(200).send({test:"Hello World"});
});

app.get('/oussema', (req,res)=>{
    res.status(200).send({mssage:"helloooo"})
})
app.listen(8080);
console.log('listening on port 8080');