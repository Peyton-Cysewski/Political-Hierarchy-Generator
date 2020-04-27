DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_password VARCHAR(255)
);


DROP TABLE IF EXISTS hierarchy;

CREATE TABLE IF NOT EXISTS hierarchy (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_data ???  VARCHAR(255)
);