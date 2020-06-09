DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE  department(
  id INT AUTO_INCREMENT,
  name VARCHAR(30) NULL,
  PRIMARY KEY (id)
);

CREATE TABLE  role(
  id INT AUTO_INCREMENT,
  title VARCHAR(30) NULL,
  salary Decimal,
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE  employee(
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INT,
  manager_id INT,
  PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ('CEO', 300000, 2), ('Senior Engineer', 280000, 1), ('Controller', 95000, 2), ('Junior Dev', 70000, 3);

INSERT INTO department (name)
VALUES ('Engineering'), ('Finances'), ('Technical Support'), ('Customer Service');

INSERT INTO employee (first_name, last_name, role_id)
Values ('Omari', 'Kassius', 1), ('Oshiona', 'Levi', 2), ('Kim', 'Bostick', 3)