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
    resources      TEXT []
);

CREATE TABLE questions (
    id                   SERIAL PRIMARY KEY,
    question             TEXT NOT NULL,
    answer               TEXT NOT NULL,
    incorrect_answers    TEXT [] NOT NULL,
    question_spanish     TEXT NOT NULL,
    answer_spanish       TEXT NOT NULL,  
    incorrect_answer_spanish TEXT [] NOT NULL,  
    module_id            INTEGER NOT NULL, 
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

INSERT INTO modules (name, description, resources)
VALUES('Learn Python','Learn Python basics.');

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answer_spanish, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 1);
