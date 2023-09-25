
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
    manager_id INT NOT NULL, --manager ID is id? 
    FOREIGN KEY (role_id),
        REFERENCES role(id),
PRIMARY KEY (id), 
ON DELETE SET NULL 
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30), 
  salary DECIMAL,
  department_id INT NOT NULL,
  FOREIGN KEY (department_id) 
  REFERENCES department(id) 
  ON DELETE SET NULL 
);

CREATE TABLE department (
id INT AUTO_INCREMENT NOT NULL,
name VARCHAR(30),
)

-- foreign keys are used on the item there are many of, and linked to the item that there will be one of. 
-- diff for many to many