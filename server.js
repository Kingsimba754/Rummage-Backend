///Dependencies
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