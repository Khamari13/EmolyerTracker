const mysql = require("mysql")
const inquirer = require("inquirer")

// database connection for sql
const connection = mysql.createConnection({
    host: "localhost",
    // port
    port: 3306,
    // username
    user: "root",
    //password
    password: "rootroot",
    database: "..."
})
