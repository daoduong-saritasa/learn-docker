-- Create user table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Add 5 users
INSERT INTO users (email, password) VALUES ('user1@gmail.com', 'password1');
INSERT INTO users (email, password) VALUES ('user2@gmail.com', 'password2');
INSERT INTO users (email, password) VALUES ('user3@gmail.com', 'password3');
INSERT INTO users (email, password) VALUES ('user4@gmail.com', 'password4');
INSERT INTO users (email, password) VALUES ('dao@gmail.com', '123');

