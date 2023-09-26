const mysql = require("mysql2");
require('dotenv').config();


//connect data to server
const db = mysql.createConnection(
    {
      host: "127.0.0.1",
      user: process.env.USER_ID,
      password: process.env.USER_PW,
      database: "employees_db",
    },
    console.log(`Connected to the employees_db database.`)
  );
  
//   console.log(db)

module.exports = db;