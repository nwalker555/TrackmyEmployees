USE employeetdb;

INSERT INTO department (name)
VALUES (01, "Sales"), (02, "Engineering"), (03, "Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Manager", 100000, 01), ("Software Engineer", 110000, 02), ("HR Manager", 90000, 03)

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 01, NULL), ("Jane", "Doe", 02, NULL), ("Sally", "Doe", 03, NULL)