
DROP DATABASE IF EXISTS employees_db;
CREATE DATABASE employees_db;

USE employees_db;


CREATE TABLE departments (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NOT NULL, 
  salary DECIMAL (10,2) NOT NULL,
  department_id INT NOT NULL,
    FOREIGN KEY (department_id) 
  REFERENCES departments(id) 
);

CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30)NOT NULL,
  role_id INT, 
  manager_id INT , 
    FOREIGN KEY (role_id) 
    REFERENCES roles(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
);




-- foreign keys are used on the item there are many of, and linked to the item that there will be one of. 
-- diff for many to many