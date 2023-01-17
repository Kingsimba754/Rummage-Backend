// Setup Initialization (from pull): 
// 0. ensure git upstream is set up, delete all files except server.js
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
/// Dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const { PORT = 4000, MONGODB_URL } = process.env;
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");

///DATABASE connection///
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

/////Middleware//////
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies


//////Models//////



//////////////////

///Connection Events////
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
    .on("error", (error) => console.log(error));



/////Listener////////
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));