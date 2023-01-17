// Setup Initialization (from pull): 
// 0. delete all files except server.js, ensure git upstream is set up
// 1. npm init (creates package.json)
// 2. npm i dotenv mongoose express cors morgan (creates node modules)
// 3. npm i --save-dev nodemon
// 4. touch .env create port and MONGODB_URL

// do NOT want to push package files, node files, or .env up to github 

// ---------To push changes out upstream
// 1. git add ""
// 2. git commit -m ""
// 3. git push origin development (pushes to local development)
// 4. go to github personal development branch page
// 5. click contribute -> open pull request
// 6. compare: development, base: master -> create pull request

// as soon as merged with remote master (by owner)
// 1. git checkout master (switch to your master branch)
// 2. git pull upstream master (pull changes from upstream master to local master)
// 3. git checkout -b development (switch from local master to local development branch)
// begin more changes

// ------- (if needed) git merge master - (combines master to development) 

// ----------------------------------------------------------------------------------------------
// Dependencies----------
require('dotenv').config(); // get .env variables
const express = require('express'); // import express
const mongoose = require("mongoose"); // import mongoose
const morgan = require("morgan"); // import morgan
const cors = require('cors') // import cors 

// Initialize the Express App----------
const app = express() // create application object

// Configure App Settings----------
const {PORT = 4000, MONGODB_URL} = process.env; // pull PORT and MONGODB from .env, give default value of 4000

// DATABASE CONNECTION----------------
mongoose.connect(MONGODB_URL); // connect to mongoDB

mongoose.connection // mongo status listeners
    .on("open", () => console.log("Connected to MongoDB"))
    .on("error", (error) => console.log('Error with MongoDB:' + error.message));

// Mount Middleware----------
app.use(cors()) // to prevent cors errors, open access to all origins
app.use(morgan("dev")) // logging
app.use(express.json()) // creates "req.body"
// do not use app.use(express.urlencoded) (ONLY FOR Express serving HTML not JSON)
 
// MODELS (Set up model)----------------
const itemSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    price: Number
}, {timestamps: true})

const Item = mongoose.model('Item', itemSchema)

// ROUTES--------------------------------------------------
app.get("/", (req, res) => {
    res.send("hello world");
});

// Index
app.get('/rummage', async (req,res) => { // New, shorter syntax using async await

    // Try/catch statement catches error before it crashes program
    try{ 
        const item = await Item.find({}); // Instead of People.find({}, (err, people))
        res.json(item); 
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'})
    }
})

// Create
app.post('/rummage', async (req, res) => {
    try {
        const item = await Item.create(req.body);
        res.json(item);
    } catch (error) {
        console.log('error: ', error);
        res.json({error: 'something went wrong - check console'})
    }
})


// LISTENER---------- (Tell Express to Listen)
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));


