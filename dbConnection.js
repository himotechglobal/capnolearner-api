const mysql = require("mysql2");
require('dotenv').config()

const db_connection = mysql
  .createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASS, 
  })
  .on("error", (err) => {
    console.log("Failed to connect to Database - ", process.env.DB_HOST);
  });

module.exports = db_connection;