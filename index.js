const inquirer = require("inquirer");
const mysql = require("mysql2");
const connection = require("./config/connection.js");

//initialize inquirer main menu
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
        "Exit",
        // "Update employee managers",
        // "View employees by manager",
        // "View employees by department",
        // "Delete departments, roles, and employees",
        // "View the total utilized budget of a department"
      ],
    })
    //used switch case to replace the answer with the function, in place of name:options
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
//just view functions ------------------------------
function viewAllDepartments() {
  console.log("All Departments");
  const query = `SELECT * FROM departments`;

  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function viewAllRoles() {
  console.log("All Roles");
  const query = `SELECT * FROM roles INNER JOIN departments ON roles.department_id = departments.id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
function viewAllEmployees() {
  console.log("All Employees");
  const query = `SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees LEFT JOIN roles ON employees.role_id = roles.id`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.table(res);
    init();
  });
}
//add functions ----------------------
// function to add a department
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

// function to add a role
function addARole() {
  const query = `SELECT name FROM departments`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    //instead of for loop-- map
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
        //make a query to get the chosen department option
        const departmentQuery = `SELECT id FROM departments WHERE name = ?`;
        connection.query(
          departmentQuery,
          [answer.new_department],
          (err, res) => {
            if (err) throw err;
            //get the ID for the dept
            const new_department_id = res[0].id;
            //make query to insert new role into database with the new title, salary, and corresponding department ID
            const roleQuery = `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`;
            const params = [
              answer.new_role,
              answer.new_salary,
              new_department_id,
            ];
            connection.query(roleQuery, params, (err, res) => {
              if (err) throw err;
              //show success
              console.log(`Added "${answer.new_role}" role successfully!`);
              init();
            });
          }
        );
      });
  });
}
//add employee function
function addAnEmployee() {
  //query to get role options
  const query = `SELECT title FROM roles`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    const roleOptions = res.map((role) => role.title);
    //query to get manager options
    const managerQuery =
      "SELECT first_name, last_name, manager_id FROM employees WHERE manager_id IS null";
    connection.query(managerQuery, (err, res) => {
      if (err) throw err;
      const managerOptions = res.map(
        (manager) => `${manager.first_name} ${manager.last_name}`
      );

      inquirer
        .prompt([
          {
            type: "input",
            name: "new_first_name",
            message: "What is your employee's first name?",
          },
          {
            type: "input",
            name: "new_last_name",
            message: "What is your employee's last name?",
          },
          {
            type: "list",
            name: "new_role",
            message: "Which Role will this employee fill?",
            choices: roleOptions,
          },
          {
            type: "list",
            name: "new_manager",
            message: "Who is the employee's manager?",
            choices: managerOptions,
          },
        ])
        .then((answer) => {
          // Fetch role ID for the selected role
          const roleQuery = `SELECT id FROM roles WHERE title = ?`;
          connection.query(roleQuery, [answer.new_role], (err, res) => {
            if (err) throw err;
            const new_role_id = res[0].id;

            // Insert the new employee into the employees table
            const employeeQuery = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?, ?, ?)`;
            const params = [
              answer.new_first_name,
              answer.new_last_name,
              new_role_id,
            ];
            connection.query(employeeQuery, params, (err, res) => {
              if (err) throw err;
              console.log(
                `Added "${answer.new_first_name} ${answer.new_last_name}" employee successfully!`
              );
              init();
            });
          });
        });
    });
  });
}

function updateAnEmployeeRole() {
  const employeesQuery =
    "SELECT employees.id, employees.first_name, employees.last_name, roles.title FROM employees LEFT JOIN roles ON employees.role_id = roles.id";
  const rolesQuery = `SELECT * FROM roles`;
  const managerQuery =
    "SELECT first_name, last_name, manager_id FROM employees WHERE manager_id IS null";

  connection.query(employeesQuery, (err, resEmployees) => {
    if (err) throw err;
    connection.query(rolesQuery, (err, resRoles) => {
      if (err) throw err;

      connection.query(managerQuery, (err, resManager) => {
        if (err) throw err;

        const employeeOptions = resEmployees.map(
          (employee) => `${employee.first_name} ${employee.last_name}`
        );
        const roleOptions = resRoles.map((role) => role.title);
        const managerOptions = resManager.map(
          (manager) => `${manager.first_name} ${manager.last_name}`
        );

        inquirer
          .prompt([
            {
              type: "list",
              name: "update_employee",
              message: "Which Employee would you like to update?",
              choices: employeeOptions,
            },
            {
              type: "list",
              name: "new_role",
              message: "Which Role will this employee fill?",
              choices: roleOptions,
            },
            {
              type: "list",
              name: "new_manager",
              message: "Who will be the employee's manager?",
              choices: managerOptions,
            },
          ])
          .then((answer) => {
            const employeeToUpdate = resEmployees.find(
              (employee) =>
                `${employee.first_name} ${employee.last_name}` ===
                answer.update_employee
            );
            const newRoleId = resRoles.find(
              (role) => role.title === answer.new_role
            ).id;
            const newManagerId = resManager.find(
              (manager) => manager.full_name === answer.new_manager
            );

            const updateQuery =
              "UPDATE employees SET role_id = ?, manager_id = ? WHERE id = ?";
            const params = [newRoleId, newManagerId, employeeToUpdate.id];

            connection.query(updateQuery, params, (err, res) => {
              if (err) throw err;
              console.log(
                `Updated role and manager for ${answer.update_employee} successfully!`
              );
              init();
            });
          });
      });
    });
  });
}

init();

//do two for employees because oyu have to set manager, select all from employees, where manager_id is null
