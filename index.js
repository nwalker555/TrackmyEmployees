const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'EmployeeTracker',
})

connection.connect();

function startList() {
    inquirer.prompt(
        {
            type: 'list',
            message: 'What do you want to do?',
            name: 'option',
            choices: [
                'Add new Department',
                'Add new Role',
                'Add new employees',
                'View Departments',
                'View Roles',
                'View Employees',
                'Update Employee Roles',
                'Exit'
            ]
        }).then(answer => {
            switch (answer.option) {
                case "Add new Department":
                    addNewDepartment();
                    break;

                case "Add new Role":
                    addNewRole();
                    break;

                case "Add new Employee":
                    addNewEmployee();
                    break;

                case "View Departments":
                    viewDepartments();
                    break;

                case "View Roles":
                    viewRoles();
                    break;

                case "View Employees":
                    viewEmployees();
                    break;

                case "Update Employee Roles":
                    updateEmployeeRoles();
                    break;

                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function addNewDepartment() {
    inquirer.prompt([
        {
            message: "Enter New Department",
            type: "input",
            name: "department"
        }
    ]).then(function (response) {
        console.log(answer);
        connection.query("INSERT INTO department SET ?", { name: answer.department }, (err, data) => {
            if (err) throw err;
            startList();
        })
    })
}

function addNewRole() {
    inquirer.prompt([
        {
            message: "Enter Role Title",
            type: "input",
            name: "title"
        }, {
            message: "Enter Role Salary",
            type: "number",
            name: "salary"
        }, {
            message: "Enter Department",
            type: "input",
            name: "department"
        }
    ]).then(function (response) {
        connection.query("INSERT INTO roles (title, salary, department) values(?, ?, ?)", [response.title, response.salary, response.department], function (err, data) {
            console.table(data);
        })
        startList();
    })
}

function addNewEmployee() {
    inquirer.prompt([
        {
            name: "firstName",
            type: "input",
            message: "What is new employee's first name?"
        }, {
            name: "lastName",
            type: "input",
            message: "What is new employee's last name?"
        }, {
            name: "roleID",
            type: "number",
            message: "What is new employees role ID?"
        }, {
            name: "managerID",
            type: "number",
            message: "What is new employees manager's ID?"
        }
    ]).then(function(response) {
        connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstName, response.lastName, response.roleID, response.managerID], function (err,data) {
            if (err) throw err;
            startList();
        })
    })
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function (err, data) {
        console.table(data);
        startList();
    })
}

function viewRoles() {
    connection.query("SELECT * FROM roles", function (err, data) {
        console.table(data);
        startList();
    })
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function (err, data) {
        console.table(data);
        startList();
    })
}

function updateEmployeeRoles() {
    inquirer.prompt([
        {
            message: "Which employee would you like to change?",
            type: "input",
            name: "name"
        }, {
            message: "What is the employees new role ID:",
            type: "number",
            name: "role_id"
        }
    ]).then(function (response) {
        connection.query("UPDATE employee SET role_id = ? WHERE first_name = ?", [response.role_id, response.name], function (err, data) {
            console.table(data);
        })
        startList();
    })
}

startList();