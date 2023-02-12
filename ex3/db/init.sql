-- Create table roles
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert roles
INSERT INTO roles (name) VALUES ('admin');
INSERT INTO roles (name) VALUES ('teacher');
INSERT INTO roles (name) VALUES ('student');

-- Create table users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role_id INTEGER NOT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- Insert users
INSERT INTO users (username, password, name, role_id) VALUES ('admin', 'admin', 'Admin', 1);
INSERT INTO users (username, password, name, role_id) VALUES ('teacher', 'teacher', 'Hank', 2);
INSERT INTO users (username, password, name, role_id) VALUES ('student1', 'student', 'John', 3);
INSERT INTO users (username, password, name, role_id) VALUES ('student2', 'student', 'David', 3);
INSERT INTO users (username, password, name, role_id) VALUES ('student3', 'student', 'Thomas', 3);


-- Create table groups
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert groups
INSERT INTO groups (name) VALUES ('Group 1');
INSERT INTO groups (name) VALUES ('Group 2');

-- Create table user groups
CREATE TABLE user_groups (
    id SERIAL,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (group_id) REFERENCES groups(id),
    PRIMARY KEY (user_id, group_id)
);

-- Insert user groups
INSERT INTO user_groups (user_id, group_id) VALUES (2, 1);
INSERT INTO user_groups (user_id, group_id) VALUES (3, 1);
INSERT INTO user_groups (user_id, group_id) VALUES (4, 1);
INSERT INTO user_groups (user_id, group_id) VALUES (5, 1);

INSERT INTO user_groups (user_id, group_id) VALUES (2, 2);
INSERT INTO user_groups (user_id, group_id) VALUES (3, 2);
INSERT INTO user_groups (user_id, group_id) VALUES (4, 2);

-- Create table word translation task
CREATE TABLE word_translation (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    from_language VARCHAR(255) NOT NULL,
    to_language VARCHAR(255) NOT NULL
);

-- Insert word translation task
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('dog', 'собака', 'en', 'ru');
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('cat', 'кошка', 'en', 'ru');
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('house', 'дом', 'en', 'ru');
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('car', 'машина', 'en', 'ru');
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('table', 'стол', 'en', 'ru');
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('chair', 'стул', 'en', 'ru');
INSERT INTO word_translation (word, translation, from_language, to_language) VALUES ('window', 'окно', 'en', 'ru');

-- Create table task
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    sent_at TIMESTAMP,
    group_id INTEGER NOT NULL,
    FOREIGN KEY (group_id) REFERENCES groups(id)
);

-- Insert task
INSERT INTO tasks (name, description, sent_at, group_id) VALUES ('Task 1', 'Task 1 description', '2020-01-01 00:00:00', 1);
INSERT INTO tasks (name, description, sent_at, group_id) VALUES ('Task 2', 'Task 2 description', NULL, 1);
INSERT INTO tasks (name, description, sent_at, group_id) VALUES ('Task 3', 'Task 3 description', '2020-01-01 00:00:00', 2);

-- Create table task word translation
CREATE TABLE task_word_translation (
    id SERIAL,
    task_id INTEGER NOT NULL,
    word_translation_id INTEGER NOT NULL,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (word_translation_id) REFERENCES word_translation(id),
    PRIMARY KEY (task_id, word_translation_id)
);

-- Insert task word translation
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (1, 1);
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (1, 2);
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (1, 3);
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (1, 4);
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (2, 5);
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (2, 6);
INSERT INTO task_word_translation (task_id, word_translation_id) VALUES (2, 7);