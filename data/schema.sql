DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_password VARCHAR(255)
);


DROP TABLE IF EXISTS users_data;

CREATE TABLE IF NOT EXISTS users_data (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_data ???  VARCHAR(255)
);