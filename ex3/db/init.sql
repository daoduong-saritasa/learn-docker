-- Create student table
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL
);

-- Create teacher table
CREATE TABLE teachers (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  email VARCHAR(30) NOT NULL
);

-- Create groups table
CREATE TABLE groups (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

-- Create group_student table
CREATE TABLE group_student (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL,
  student_id INTEGER NOT NULL,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (student_id) REFERENCES students(id)
);

-- Create group_teacher table
CREATE TABLE group_teacher (
  id SERIAL PRIMARY KEY,
  group_id INTEGER NOT NULL,
  teacher_id INTEGER NOT NULL,
  FOREIGN KEY (group_id) REFERENCES groups(id),
  FOREIGN KEY (teacher_id) REFERENCES teachers(id)
);

-- Insert 1 group
INSERT INTO groups (name) VALUES ('Group 1');

-- Insert 2 teachers
INSERT INTO teachers (name, email) VALUES ('John Wick', 'jwick@gmail.com');
INSERT INTO teachers (name, email) VALUES ('Suana Smith', 'ssmith@gmail.com');

-- Insert 5 students
INSERT INTO students (name, email) VALUES ('John', 'john@gmail.com');
INSERT INTO students (name, email) VALUES ('David ', 'david@gmail.com');
INSERT INTO students (name, email) VALUES ('Susan ', 'susan@gmail.com');
INSERT INTO students (name, email) VALUES ('Nick', 'nick@gmail.com');
INSERT INTO students (name, email) VALUES ('Thomas', 'thomas@gmail.com');

-- Insert 2 students into group 1
INSERT INTO group_student (group_id, student_id) VALUES (1, 1);
INSERT INTO group_student (group_id, student_id) VALUES (1, 2);

-- Insert 1 teacher into group 1
INSERT INTO group_teacher (group_id, teacher_id) VALUES (1, 1);

-- Select all students in group 1 and their teacher
SELECT students.name, teachers.name
FROM students
INNER JOIN group_student ON students.id = group_student.student_id
INNER JOIN groups ON group_student.group_id = groups.id
INNER JOIN group_teacher ON groups.id = group_teacher.group_id
INNER JOIN teachers ON group_teacher.teacher_id = teachers.id
WHERE groups.id = 1;
