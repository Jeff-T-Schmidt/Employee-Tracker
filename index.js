const inquirer = require('inquirer');
const mysql = require('mysql2');
// const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        password: 'password',
        database: 'tracker_db'
    },
    console.log(`Connected to the tracker_db database.`)
);


const ask = () => {
    inquirer.prompt([
        {
            type: "list",
            message: "What would you like to do?",
            name: "selection",
            choices: ["Add Employee", "Update Employee role", "View All roles", "Add Role", "View All Departments", "Add Departments", "Quit"]
        },
    ]).then(ans => {
        switch (ans.selection) {
            case "Add Employee":
                addEmployee()
                break;
            case "Update Employee role":
                updateRole()
                break;
            case "View All roles":
                viewRoles()
                break;
            case "Add Role":
                addRole()
                break;
            case "View All Departments":
                viewDepartments()
                break;
            case "Add Departments":
                addDepartments()
                break;

            default:
                console.log("Bye!")

                break;
        }
    })
    const addEmployee = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: ["Sales Lead", "Salesperson", "Lead Engineer", "Software Engineer", "Account Manager", "Accountant", "Legal Team Lead", "Lawyer"]
                // Does the choices array need to be populated from the 'roles' table?
            },
            {
                type: "list",
                name: "manager",
                message: "Who is the employee's manager?",
                choices: ["None", "John Doe", "Mike Jones", "Jeff Schmidt", "Tosh Smith ", "Brenda Johnson"]
                // Does the choices array need to be populated from the 'roles' table? I don't know how to id the managers.
            },
        ]).then(ans => {
            const first = ans.firstName
            const last = ans.lastName
            const role = ans.role
            const manager = ans.manager

            db.query(`INSERT INTO employee(first_name)
            VALUE ("${first}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
            db.query(`INSERT INTO employee(last_name)
            VALUE ("${last}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
            db.query(`INSERT INTO employee(role_id)
            VALUE ("${role}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                //wont work because the input of role wont be an INT
            })
            db.query(`INSERT INTO employee(manager_id)
            VALUE ("${manager}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                //wont work because the input of manager wont be an INT
            })
            console.log(first + last + " has been added!")
            ask()

        })

    }
    const updateRole = () => {
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee's role do you want to update?",
                choices: ["Jeff Schmidt", "Tosh Smith", "Brenda Johnson", "Sarah Connor", "Ashley Mcguile", "Mike Jones"]
            },
            {
                type: "list",
                name: "role",
                message: "Which role do you want to assign the selected employee?",
                choices: ["Sales Lead", "Lead Engineer", "Software Engineer", "Account Manager", "Legal Team Lead", "Lawyer"]
            },
        ]).then(ans => {
            const employee = ans.employee
            const role = ans.role


            db.query(`SELECT first_name, last_name FROM employee`, (err, result) => {
                if (err) {
                    console.log(err);
                }
                //absolutely lost.......
            })
            // db.query(`UPDATE employee ("${employee}")`, (err, result) => {
            //     if (err) {
            //         console.log(err);
            //     }
            // })
            console.log("Updated employee's role!") 
            ask();
        })
    }
    const viewRoles = () => {
        db.query(`SELECT * FROM roles INNER JOIN department WHERE roles.department_id = department.id;`, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);
            //not showing data because sql keeps returning an empty set
            //but I do think this is the correct SELECT statement
        })

        ask()

    }
    const addRole = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
            },
            {
                type: "list",
                name: "department",
                message: "Which department does the role belong to?",
                choices: ["Finance", "Legal", "Sales", "Engineering"]
                //I'm guessing this needs to be slected from the database somehow?
            },
        ]).then(ans => {
            const newRole = ans.roleName
            const salary = ans.salary
            const department = ans.department
            console.log(newRole + " has been added!")
            db.query(`INSERT INTO roles(title)
            VALUE ("${newRole}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
            db.query(`INSERT INTO roles(salary)
            VALUE ("${salary}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
            db.query(`INSERT INTO roles(department_id)
            VALUE ("${department}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
            ask()

        })
    }
    const viewDepartments = () => {
        db.query(`SELECT * FROM department;`, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.table(result);

        })
        ask();
    }
    const addDepartments = () => {
        inquirer.prompt([
            {
                type: "input",
                name: "newDepartment",
                message: "What is the name of the new department?",
            },
        ]).then(ans => {
            const newDepartment = ans.newDepartment
            console.log(newDepartment + " has been added!")
            db.query(`INSERT INTO department(name)
            VALUE ("${newDepartment}")`, (err, result) => {
                if (err) {
                    console.log(err);
                }

            })
            ask()

        })
    }
}
ask();

