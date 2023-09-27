SELECT * FROM departments; 
SELECT employees.id, first_name, last_name, title, salary, department_id  
FROM employees 
JOIN roles
ON employees.role_id = roles.id 

JOIN departments 
ON department_id = departments.id;

SELECT departments.department_name AS department
FROM 
LEFT JOIN departments
ON reviews.department_id = departments.id
ORDER BY departments.department_name;