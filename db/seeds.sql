INSERT INTO departments (name)
VALUES ("Sales"),
       ("Engineering"),
       ("Finance"),
       ("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000.00, 1),
       ("Salesperson", 80000.00, 1),
        ("Lead Engineer", 150000.00, 2),
         ("Software Engineer", 120000.00, 2),
          ("Accountant Manager", 160000.00, 3),
           ("Accountant", 125000.00, 3),
           ("Legal Team Lead", 250000.00, 4),
           ("Lawyer", 190000.00, 4);
    
    INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES ("Chris", "Traeger", 1, null), 
    ("Ann", "Perkins", 2, 1), 
     ("Leslie", "Knope", 3, null), 
    ("Tom", "Haverford", 4, 1),
    ("Andy", "Dwyer", 5, null),
    ("April", "Ludgate", 6, 1),
     ("Jerry", "Gergich", 7, null),
    ("Donna", "Meagle", 8, 1);


    
