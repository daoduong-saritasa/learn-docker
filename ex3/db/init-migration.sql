CREATE EXTENSION pgcrypto;

CREATE TABLE public."user" (
  id serial4 NOT NULL,
  email varchar(30) NOT NULL,
  password_hash varchar(255) NOT NULL,
  firstname varchar(255) NULL,
  lastname varchar(255) NULL,
  created_date timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  is_admin bool NOT NULL DEFAULT false,
  CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE role vocabulary_admin;

GRANT pg_read_all_data TO vocabulary_admin;

GRANT ALL ON ALL TABLES IN SCHEMA public TO vocabulary_admin;

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname, created_date, is_admin)
VALUES
(
    1,
    'admin@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Stephan',
    'Larok',
    '2022-12-22 09:01:01.720',    
    TRUE
  );

CREATE TYPE public.jwt_token AS (
  role text,
  exp integer,
  user_id integer,
  is_admin boolean,
  email varchar
);

CREATE FUNCTION public.authenticate(
  email text, 
  password text
) RETURNS public.jwt_token AS $$ 
DECLARE
  account public.user;
BEGIN
  SELECT
    u.* INTO account
  FROM
    public.user AS u
  WHERE
    u.email = authenticate.email;

  IF account.password_hash = crypt(password, account.password_hash) THEN 
    RETURN (
      'vocabulary_admin',
      extract(
        epoch
        FROM NOW() + interval '30 days'
      ),
      account.id,
      account.is_admin,
      account.email
    )::public.jwt_token;
  ELSE
    RETURN NULL;
  END IF;
END;

$$ language plpgsql strict SECURITY DEFINER;

CREATE FUNCTION current_user_id() RETURNS integer AS $$
SELECT
  nullif(current_setting('jwt.claims.user_id', TRUE), '')::integer;

$$ language SQL stable;

CREATE FUNCTION public.user_profile() RETURNS "user" AS $$
SELECT
  *
FROM
  public.user
WHERE
  id = current_user_id();

$$ language SQL stable;

-- Insert user

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname, is_admin)
VALUES
(
    2,
    'dao@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Dao',
    'Duong',  
    TRUE
);

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname)
VALUES
(
    3,
    'thomas@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Thomas',
    'Duong'
);

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname)
VALUES
(
    4,
    'david@saritasa.com',
    crypt('123', gen_salt('md5')),
    'David',
    'Bertrand'
);

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname)
VALUES
(
    5,
    'john@saritasa.com',
    crypt('123', gen_salt('md5')),
    'John',
    'Smith'
);

INSERT INTO
  public."user" (id, email, password_hash, firstname, lastname)
VALUES
(
    6,
    'samantha@saritasa.com',
    crypt('123', gen_salt('md5')),
    'Samantha',
    'Green'
);

-- Create table group
CREATE TABLE public."group" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Insert group
INSERT INTO public."group" (name) VALUES ('Group 1');
INSERT INTO public."group" (name) VALUES ('Group 2');

-- Create table user group
CREATE TABLE public."user_group" (
    id SERIAL,
    user_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public."user"(id),
    FOREIGN KEY (group_id) REFERENCES public."group"(id),
    PRIMARY KEY (user_id, group_id)
);

-- Insert user group
INSERT INTO public."user_group" (user_id, group_id) VALUES (1, 1);
INSERT INTO public."user_group" (user_id, group_id) VALUES (2, 1);
INSERT INTO public."user_group" (user_id, group_id) VALUES (3, 1);
INSERT INTO public."user_group" (user_id, group_id) VALUES (4, 1);
INSERT INTO public."user_group" (user_id, group_id) VALUES (5, 1);

INSERT INTO public."user_group" (user_id, group_id) VALUES (1, 2);
INSERT INTO public."user_group" (user_id, group_id) VALUES (2, 2);
INSERT INTO public."user_group" (user_id, group_id) VALUES (4, 2);
INSERT INTO public."user_group" (user_id, group_id) VALUES (6, 2);

-- Create table word translation task
CREATE TABLE public."word_translation" (
    id SERIAL PRIMARY KEY,
    word VARCHAR(255) NOT NULL,
    translation VARCHAR(255) NOT NULL,
    from_language VARCHAR(255) NOT NULL,
    to_language VARCHAR(255) NOT NULL
);

-- Insert word translation task
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('dog', 'собака', 'en', 'ru');
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('cat', 'кошка', 'en', 'ru');
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('house', 'дом', 'en', 'ru');
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('car', 'машина', 'en', 'ru');
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('table', 'стол', 'en', 'ru');
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('chair', 'стул', 'en', 'ru');
INSERT INTO public."word_translation" (word, translation, from_language, to_language) VALUES ('window', 'окно', 'en', 'ru');

-- Create table task
CREATE TABLE public."task" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    sent_at TIMESTAMP,
    group_id INTEGER NOT NULL,
    FOREIGN KEY (group_id) REFERENCES public."group"(id)
);

-- Insert task
INSERT INTO public."task" (name, description, sent_at, group_id) VALUES ('Task 1', 'Task 1 description', '2020-01-01 00:00:00', 1);
INSERT INTO public."task" (name, description, sent_at, group_id) VALUES ('Task 2', 'Task 2 description', NULL, 1);
INSERT INTO public."task" (name, description, sent_at, group_id) VALUES ('Task 3', 'Task 3 description', '2020-01-01 00:00:00', 2);

-- Create table task word translation
CREATE TABLE task_word_translation (
    id SERIAL,
    task_id INTEGER NOT NULL,
    word_translation_id INTEGER NOT NULL,
    FOREIGN KEY (task_id) REFERENCES public."task"(id),
    FOREIGN KEY (word_translation_id) REFERENCES public."word_translation"(id),
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