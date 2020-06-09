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

function initApp() {
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
    .then(function(choice) {
        switch (choice.option){
            case "view Departments":
                viewDepartments()
                break

                case "view Roles":
                    viewRoles()
                    break

                case "view Employees":
                    viewEmployees()
                    break

                case "Add Department":
                    addDepartment()
                    break

                case "Add Role":
                    addRole()
                    break

                case "Add Employee":
                    addEmployee()
                    break

                case "Update Employee role":
                    updateEmployee()
                    break

                case "Exit":
                    connection.end()
                    break
        }
    })
}
// view departments
function viewDepartments()