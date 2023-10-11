const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

let laptop = fs.readFileSync('./assets/data/laptops.json');

var app = express();
app.use(bodyParser.json());

const laptopRoutes = require("./src/routes/LaptopRoute");

app.use("/laptop", laptopRoutes);

const port = 3036;
app.listen(port,()=>{
    console.log("Server is running at port 3036...");
});