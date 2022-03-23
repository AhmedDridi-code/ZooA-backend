
// ============imports=============
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const usersRoute = require('./src/routes/user');
const upgradeRequestRoute=require('./src/routes/upgradeRequest')
const postsRoute = require('./src/routes/post')
//app.use(cors);

const veterenaireRoute = require('./src/routes/veterinaire')
const rdvRoute = require('./src/routes/rendez-vous')

//========== configuration ============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
    // intercept OPTIONS method
    if ('OPTIONS' == req.method){
      res.send(200);
    }
    else {
      next();
    }
})


//=========== connecting to database ==============
mongoose.connect("mongodb+srv://admin:admindb@cluster0.yl1pn.mongodb.net/Zooa?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {console.log("Connected to database")})
.catch(err => console.log("error has been occured: ",err));

// ========= configurring routes ==========
app.use("/api/veterinaire", veterenaireRoute)
app.use("/api/appointement", rdvRoute)
app.use("/api/posts",postsRoute)
app.use("/api/users",usersRoute)
app.use("/api/upgradeRequest",upgradeRequestRoute)
// ======== exporting app ========
module.exports =app;