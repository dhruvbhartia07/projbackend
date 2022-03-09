require('dotenv').config()


const mongoose = require('mongoose');
const express = require("express");

const app = express();

mongoose.connect(process.env.DATABASE)
  .then(() => {
  console.log("DB CONNECTED");
  })
  .catch(
    console.log("DB CONNECTION ERROR!!")
  );

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`app is running at ${port}`);
});