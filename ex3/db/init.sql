-- Create student table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
);

-- Create teacher table
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL,
);

-- Create group table
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  teacher_id INTEGER REFERENCES teachers(id),
  student_id INTEGER REFERENCES students(id),
);

-- Insert 2 teachers
INSERT INTO teachers (name, email) VALUES ('John Wick', 'jwick@gmail.com');
INSERT INTO teachers (name, email) VALUES ('Suana Smith', 'ssmith@gmail.com');

-- Insert 5 students
INSERT INTO students (name, email) VALUES ('John', 'john@gmail.com');
INSERT INTO students (name, email) VALUES ('David ', 'david@gmail.com');
INSERT INTO students (name, email) VALUES ('Susan ', 'susan@gmail.com');
INSERT INTO students (name, email) VALUES ('Nick', 'nick@gmail.com');
INSERT INTO students (name, email) VALUES ('Thomas', 'thomas@gmail.com');

-- Insert 1 group with 3 students
INSERT INTO groups (name, teacher_id, student_id) VALUES ('Group 1', 1, 1);
INSERT INTO groups (name, teacher_id, student_id) VALUES ('Group 1', 1, 2);
INSERT INTO groups (name, teacher_id, student_id) VALUES ('Group 1', 1, 3);
