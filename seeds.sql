INSERT INTO department (name)
VALUES  ("Sales"),
        ("Legal Dept"),
        ("Finance"),
        ("Engineering");
        
INSERT INTO roles (title, salary, department_id)
VALUES  ("Engineer", "100000",4),
        ("Sales", "90000",1),
        ("Account", "80000",3),
        ("Legal", "70000",2);
        
       
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jeff", "Schmidt", 4, null),
        ("Tosh", "Smith", 1, 1),
        ("Brenda", "Johnson", 3, 1),
        ("Sarah", "Connor", 1, null),
        ("Ashley", "Mcguile", 4, null),
        ("Mike", "Jones", 2, null);