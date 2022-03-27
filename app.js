
// ============imports=============
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require ('path');
const app = express();

// ============ imporing routes ================
const usersRoute = require('./src/routes/user');
const upgradeRequestRoute=require('./src/routes/upgradeRequest')
const postsRoute = require('./src/routes/post');
const veterenaireRoute = require('./src/routes/veterinaire')
const rdvRoute = require('./src/routes/rendez-vous')
const userData = require('./src/middlewares/UserData')
//========== configuration ============
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(userData);


// configuring cors
//app.use(cors);
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control");
    // intercept OPTIONS method
    if ('OPTIONS' == req.method){
      res.status(200).send();
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
app.use("/images",express.static(path.join('./src/images')))
app.use("/api/veterinaire", veterenaireRoute)
app.use("/api/appointement", rdvRoute)
app.use("/api/posts",postsRoute)
app.use("/api/users",usersRoute)
app.use("/api/upgradeRequest",upgradeRequestRoute)
// ======== exporting app ========
module.exports =app;