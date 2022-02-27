const express = require('express');
const app = express();
const port = 8080;
app.get('/', (req, res) => {
    res.status(200).send({test:"Server is running ..... "});
});
app.get('/ons', (req, res) => {
    res.status(200).send({test:"hello from the other side :D"});
});
app.get('/onsssssss', (req, res) => {
    res.status(200).send({test:"hello from the other side :D"});
});


app.get('/oussema', (req,res)=>{
    res.status(200).send({mssage:"helloooo"})
})
app.get('/zineddine', (req, res) => {
    res.status(200).send({test:"Hello zineddine's branch"});
});
app.get('/zineddine2', (req, res) => {
    res.status(200).send({test:"Hello zineddine's 2nd commt branch"});
});
app.listen(8080);
console.log('listening on port ',port);