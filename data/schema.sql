-- Creates a table for unique users
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  user_password VARCHAR(255)
);

-- Creates a table for specific data for the tiers themselves
DROP TABLE IF EXISTS politics;

CREATE TABLE IF NOT EXISTS politics (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  government VARCHAR(255),
  ruler_male_title VARCHAR(255),
  ruler_female_title VARCHAR(255),
  government_description VARCHAR(1000),
  tier1 VARCHAR(255), 
  tier1_male_title VARCHAR(255),
  tier1_female_title VARCHAR(255),
  tier1_description VARCHAR(1000),
  tier2 VARCHAR(255),
  tier2_male_title VARCHAR(255),
  tier2_female_title VARCHAR(255),
  tier2_description VARCHAR(1000),
  tier3 VARCHAR(255), 
  tier3_male_title VARCHAR(255),
  tier3_female_title VARCHAR(255),
  tier3_description VARCHAR(1000)
);

-- Creates a table for metadata of the hierarchy to be used in the function that generates the fully realized hierarchy
DROP TABLE IF EXISTS hierarchy;

CREATE TABLE IF NOT EXISTS hierarchy (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users (id),
  creation_name TEXT,
  politics_id INTEGER REFERENCES politics (id),
  tier_number_array INTEGER[3],
  tier_name_array TEXT
);


-- Saves temporary string
DROP TABLE IF EXISTS temp;

CREATE TABLE IF NOT EXISTS temp (
  id SERIAL PRIMARY KEY,
  metadata TEXT
);