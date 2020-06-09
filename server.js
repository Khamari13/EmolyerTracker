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

connection.connect(function(err) {
    if (err) throw (err)
    initApp()
})

const initApp = function() {
    inquirer
    .prompt({
        name: "option",
        message: "choose action",
        type: "rawlist",
        choices: [
            "view Departments",
            "view Roles",
            "view Employees",
            "Add Department",
            "Add Role",
            "Add Employee",
            "Update Employee role",
            "Exit"
        ]
    })
}