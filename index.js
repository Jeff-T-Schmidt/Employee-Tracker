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
            choices: ["View all employees","Add Employee", "Update Employee role", "View All roles", "Add Role", "View All Departments", "Add Departments", "Quit"]
        },
    ]).then(ans => {
        switch (ans.selection) {
            case "View all employees":
                viewAllemployee()
                break;
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
    const viewAllemployee = () => {
        db.query(`SELECT * FROM employee JOIN roles WHERE employee.role_id = roles.id;`, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log("\n");
            console.table(result);
        })

        ask()

    }
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
            // pull the list of the employees, select the employees from a list, once you have the employee name pull the ID from a query string then add them. 
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
            console.log("\n");
            console.table(result);
        })
        ask()
    }
    const addRole = () => {
        // run a query that pulls a title of exsisting department == do the same thing here with the promises for existing roles. SELECT name FROM department.

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
        ]).then(async function(ans) {
            // Run a query that selects the id from roles where there title = their selection. (set to a variable)
            // const roleName = (ans) => {
            //     return new Promise((resolve, reject) => {
            //         db.query(`SELECT id FROM roles WHERE title = ?;`, ans.roleName, (err, data)=>{
            //             if (err) {
            //                 reject(err);
            //             } else {
            //                 console.log(data[0])
            //                 resolve(data[0].id)
            //             }
            //         })
            //     })
            // } 
            // const somethingRole = await roleName(ans);

            const departmentID = (ans) => {
                return new Promise((resolve, reject) => {
                    db.query(`SELECT id FROM department WHERE name = ?`, ans.department, (err, data) => {
                        if (err) {
                            reject(err);
                        } else {
                            console.log(data[0])
                            resolve(data[0].id)
                        }
                    })
                })
            }
            const department = await departmentID(ans);

            console.log(department)
            db.query(`INSERT INTO roles(title, salary, department_id) VALUES (?,?,?)`, [ans.roleName, ans.salary, department], (err, data) => {
                if (err) {
                    console.log(err);

                } else {
                    console.log("Role added!")

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

