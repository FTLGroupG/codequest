CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    email       TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email) > 1),
    created_at  TIMESTAMP DEFAULT NOW (),
    updated_at  TIMESTAMP DEFAULT NOW ()
);

CREATE TABLE modules (
    id             SERIAL PRIMARY KEY,
    name           TEXT NOT NULL,
    description    TEXT NOT NULL,
    num_questions  INTEGER NOT NULL
);

CREATE TABLE questions (
    id                   SERIAL PRIMARY KEY,
    question             TEXT NOT NULL,
    answer               TEXT NOT NULL,
    question_spanish     TEXT NOT NULL,
    answer_spanish       TEXT NOT NULL,    
    module_id            INTEGER NOT NULL, 
    FOREIGN KEY (module_id) REFERENCES modules(id)
);