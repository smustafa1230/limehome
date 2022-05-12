'use strict';
const mongoose = require('mongoose');

const dbURI = process.env.DB_URI;
console.log(dbURI);
const db = async () => {
  console.log("Connecting to mongodb....")
  return mongoose.connect(dbURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => console.log("Database connected!"))
    .catch(err => console.log(err));;
}

module.exports = db;
