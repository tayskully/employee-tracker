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
    VALUES ("Chris", "Traeger", 1, 1), 
    ("Ann", "Perkins", 2, 1), 
     ("Leslie", "Knope", 3, 2), 
    ("Tom", "Haverford", 4, 2),
    ("Andy", "Dwyer", 5, 1),
    ("April", "Ludgate", 6, 2),
     ("Jerry", "Gergich", 7, 1),
    ("Donna", "Meagle", 8, 2);


    
