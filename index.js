const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = require("./config/connection.js");

//WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

function init() {
  inquirer
    .prompt({
      type: "list",
      name: "options",
      message: "What would you like to do?",
      choices: [
        "View all departments",
        "View all roles",
        "View all employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee role",
        "Exit"
        // "Update employee managers",
        // "View employees by manager",
        // "View employees by department",
        // "Delete departments, roles, and employees",
        // "View the total utilized budget of a department"
      ],
    })
    .then((answer) => {
      switch (answer.options) {
        case "View all departments":
          viewAllDepartments();
          break;
        case "View all roles":
          viewAllRoles();
          break;
        case "View all employees":
          viewAllEmployees();
          break;
        case "Add a department":
          addADepartment();
          break;
        case "Add a role":
          addARole();
          break;
        case "Add an employee":
          addAnEmployee();
          break;
        case "Update an employee role":
          updateAnEmployeeRole();
          break;

        //   case "Update employee Manager":
        //         addEmployeeManager();
        //         break;
        //   case "View Employees by Manager":
        //     viewEmployeesByManager();
        //     break;
        //   case "View Employees by Department":
        //     viewEmployeesByDepartment();
        //     break;
        //   case "Delete Departments | Roles | Employees":
        //     deleteDepartmentsRolesEmployees();
        //     break;
        //   case "View the total utilized budget of a department":
        //     viewTotalUtilizedBudgetOfDepartment();
        //     break;

        case "Exit":
          connection.end();
          console.log("Goodbye!");
          break;
      }
    });
}

//Functions---------------------------------------------------
function viewAllDepartments() {
  console.log("trying to view departments");
  const query = `SELECT * FROM departments`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function viewAllRoles() {
  console.log("trying to view roles");
  const query = `SELECT * FROM roles`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function viewAllEmployees() {
  console.log("trying to view employees");
  const query = `SELECT * FROM employees`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
//ADD FUNCTIONS----------------------
function addADepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "new_department",
        message: "Which department would you like to add?",
      },
    ])
    .then((answer) => {
      const query = `INSERT INTO departments (name)
  VALUES (?)`;
      const params = [answer.new_department];
      connection.query(query, params, (err, res) => {
        if (err) throw err;
        console.log(`added "${params}" department successfully!`);
        init();
      });
    });
}

function addARole() {
  const query = `SELECT name FROM departments`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    //instead of for loop, map
    //query everything from depts, then loop over them and put them in an array of choices
    const departmentOptions = res.map((dept) => dept.name);
    inquirer
      .prompt([
        {
          type: "input",
          name: "new_role",
          message: "Which role would you like to add?",
        },
        {
          type: "input",
          name: "new_salary",
          message: "What is the Salary of this role?",
        },
        {
          type: "list",
          name: "new_department",
          message: "Which department would you like this role to be in?",
          choices: departmentOptions,
        },
      ])
      .then((answer) => {
        const query = `INSERT INTO roles SET ?`;
        // const params = [answer.new_role, answer.new_salary, answer.new_department];
// if (answer.new_department === )
        connection.query(
          query,
          {
            title: answer.new_role,
            salary: answer.new_salary,
            department_id: answer.new_department,
          },
          (err, res) => {
            if (err) throw err;
            console.log(`added "${answer.new_role}" role successfully!`);
            init();
          }
        );
      });
  });
}

function addAnEmployee() {
  const query = `SELECT title FROM roles`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    //instead of for loop, map
    //query everything from depts, then loop over them and put them in an array of choices
    const departmentOptions = res.map((role) => role.title);
    inquirer
      .prompt([
        {
          type: "input",
          name: "new_role",
          message: "Which role would you like to add?",
        },
        {
          type: "input",
          name: "new_salary",
          message: "What is the Salary of this role?",
        },
        {
          type: "list",
          name: "new_department",
          message: "Which department would you like this role to be in?",
          choices: departmentOptions,
        },
      ])
      .then((answer) => {
        const query = `INSERT INTO roles (title, salary, department_id)
  VALUES (?)`;
        const params = [
          answer.new_role,
          answer.new_salary,
          answer.new_department,
        ];
        connection.query(query, params, (err, res) => {
          if (err) throw err;
          console.log(`added "${params}" role successfully!`);
          init();
        });
      });
  });
}

init();

//do two for employees because oyu have to set manager, select all from employees, where manager_id is null
