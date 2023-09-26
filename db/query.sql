SELECT * FROM department; 
SELECT employee.id, first_name, last_name, title, salary, department_id  
FROM employee 
JOIN role 
ON employee.role_id = role.id 

JOIN department 
ON department_id = department.id;

