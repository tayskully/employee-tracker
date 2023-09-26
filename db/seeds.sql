INSERT INTO department (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1),
       ("Salesperson", 80000.00, 1),
        ("Lead Engineer", 150000.00, 2),
         ("Software Engineer", 120000.00, 2),
          ("Accountant Manager", 160000.00, 3),
           ("Accountant", 125000.00, 3),
           ("Legal Team Lead", 250000.00, 4),
           ("Lawyer", 190000.00, 4);
    
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES ("Taylor", "Sullivan", 3, 0), 
    ("Gareth", "Marvel", 1, 1), 
    ("Wendy", "Wilson", 5, 0);


    
