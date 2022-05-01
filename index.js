const inquirer = require('inquirer');

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
                generateEmployee()
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
                ask(); //Needs to be here for the default action, if it is gone the program ends.
                break;
        }
    })
}

const generateEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
        },
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficenumber)
        team.push(newManager)
        console.log(team)

        ask()

    })
}
const updateRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
        },
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficenumber)
        team.push(newManager)
        console.log(team)

        ask()

    })
}
const viewRoles = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
        },
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficenumber)
        team.push(newManager)
        console.log(team)

        ask()

    })
}
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
        },
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficenumber)
        team.push(newManager)
        console.log(team)

        ask()

    })
}
const viewDepartments = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
        },
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficenumber)
        team.push(newManager)
        console.log(team)

        ask()

    })
}
const addDepartments = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "managerName",
            message: "What is your name?",
        },
    ]).then(ans => {
        const newManager = new Manager(ans.managerName, ans.managerId, ans.managerEmail, ans.managerOfficenumber)
        team.push(newManager)
        console.log(team)

        ask()

    })
}
ask();

