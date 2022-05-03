(`INSERT INTO department(id)
VALUE ("${newDepartment}")`, (err, result) => {
    if (err) {
        console.log(err);
    }
    console.log(result);
})

SELECT * 
FROM roles 
LEFT JOIN department 
WHERE roles.department_id = department.id;

SELECT * 
FROM roles 
JOIN department 
WHERE roles.department_id = department.id;

SELECT first_name, last_name FROM employee;

UPDATE employee
SET role_id = 3
WHERE first_name = "Jeff";

SELECT * 
FROM employee 
JOIN roles
WHERE employee.role_id = roles.id;

SELECT id
FROM roles
WHERE title = ?;