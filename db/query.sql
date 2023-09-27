SELECT * FROM departments; 
SELECT employees.id, first_name, last_name, title, salary, department_id  
FROM employees 
LEFT JOIN roles
ON employees.role_id = roles.id
LEFT JOIN departments 
ON  roles.department_id = departments.id

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;



-- SELECT departments.department_name AS department
-- FROM 
-- LEFT JOIN departments
-- ON reviews.department_id = departments.id
-- ORDER BY departments.department_name;

SELECT first_name, last_name, manager_id FROM employees WHERE manager_id = null;