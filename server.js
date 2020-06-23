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
    database: "employee_trackerDB"
})

connection.connect(function (err) {
    if (err) throw (err)
    startApp()
})

function startApp() {
    inquirer
        .prompt({
            name: "option",
            message: "choose action",
            type: "list",
            choices: [{
                name: "Display Departments",
                value: "display_Departments"
            },
            {
                name: "Display Role",
                value: "display_Role"
            },
            {
                name: "Display Employees",
                value: "display_Employees"
            },
            {
                name: "Add Department",
                value: "add_Department"
            },
            {
                name: "Add Role",
                value: "add_Role"
            },
            {
                name: "Add Employee",
                value: "add_Employee"
            },
            {
                name: "Update Role",
                value: "update_Role"
            },
            {
                name: "Exit",
                value: "Exit"
            },
            ]
        })
        .then(function (choice) {
            switch (choice.option) {
                case "display_Departments":
                    displayDepartments()
                    break

                case "add_Department":
                    addDepartment()
                    break

                case "display_Role":
                    displayRoles()
                    break

                case "add_Role":
                    addRole()
                    break

                case "display_Employees":
                    displayEmployees()
                    break

                case "add_Employee":
                    addEmployee()
                    break

                case "update_Role":
                    updateRole()
                    break

                case "Exit":
                    connection.end()
                    break
            }
        })
}
// display departments
function displayDepartments() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err)
        console.table(res)
        //takes you to homepage
        startApp()
    })
}
// add department
const addDepartment = () => {
    inquirer
        .prompt({
            name: "department",
            message: "Enter the new department name",
            type: "input"
        })
        .then(answer => {
            const query = "INSERT INTO department SET ?";
            connection.query(query, { name: answer.department }, err => {
                if (err) throw err;
            });
            startApp();
        });
};

// display roles
function displayRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
        if (err) throw (err)
        console.table(res)
        //takes you to homepage
        startApp()
    })
}
// add roles
function addRole() {
    connection.query("SELECT * FROM department", function (err, res) {
        if (err) throw (err)
        inquirer.prompt([{
            name: "title",
            type: "input",
            message: "What role would you like to add?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is this role's salary?",
            validate: function (value) {
                //checks to see if user enters valid number
                if (isNaN(value) === false) {
                    return true;
                }
                return "Enter a valid value"
            }
        },
        {
            name: "department",
            type: "list",
            message: "Choose a department",
            choices: () => {
                let disDepartmaent = [];
                for (let i = 0; i < res.length; i++) {
                    disDepartmaent.push(`${res[i].id} ${res[i].name}`);
                }
                return disDepartmaent;
            }
        }
        ])
            .then(answer => {
                let rolePosition = answer.position;
                let roleSalary = answer.salary;
                let depID = parseInt(answer.department.split("")[0]);
                const query = "INSERT INTO role (title, salary, department_id) VALUES (?,?,?)";
                connection.query(query, [rolePosition, roleSalary, depID], err => {
                    if (err) throw err;
                    //takes you to homepage
                    startApp();
                });
            });
    });

}

// display employees
function displayEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
        if (err) throw (err)
        console.table(res)
        //takes you to homepage
        startApp()
    })
}
// add employees
const addEmployee = () => {
    connection.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        console.log(res);
        inquirer
            .prompt([
                {
                    name: "first_name",
                    message: "Enter the member's first name",
                    type: "input"
                },
                {
                    name: "last_name",
                    message: "Enter the member's last name",
                    type: "input"
                },
                {
                    name: "role_id",
                    message: "Enter the member's role",
                    type: "list",
                    choices: res.map(role => ({ name: role.title, value: role.id }))
                }
            ])
            .then(answer => {
                console.log(answer);
                const query = "INSERT INTO employee SET ?";
                connection.query(query, answer, err => {
                    if (err) throw err;
                    startApp();
                });
                
            });
    })
};


// update employees
const updateRole = () => {
    connection.query("SELECT * FROM role", (err, results) => {
        const query = "SELECT * FROM employee";
        connection.query(query, (err, res) => {
            if (err) throw err;
            inquirer
                .prompt([
                    {
                        name: "employee",
                        message: "Choose the employee you wish to update",
                        type: "list",
                        choices: () => {
                            let newRole = [];
                            for (let i = 0; i < res.length; i++) {
                                newRole.push({
                                    name: `${res[i].first_name} ${res[i].last_name}`,
                                    value: res[i].id
                                });
                            }
                            return newRole;
                        }
                    },
                    {
                        name: "newEmployee",
                        message: "Enter the employees updated role",
                        type: "list",
                        choices: results.map(role => ({
                            name: role.title,
                            value: role.id
                        }))
                    }
                ])
                .then(answer => {
                    console.log(answer);
                    const query = "UPDATE employee SET role_id =?";
                    connection.query(query, [answer.newEmployee, answer.employee], err => {
                        if (err) throw err;
                        startApp();
                    });
                });
        })
    })
}