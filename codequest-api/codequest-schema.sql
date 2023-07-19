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

CREATE TYPE question_type AS ENUM ('select', 'drag');

CREATE TABLE questions (
    id                   SERIAL PRIMARY KEY,
    question             TEXT NOT NULL,
    answer               TEXT NOT NULL,
    question_spanish     TEXT NOT NULL,
    answer_spanish       TEXT NOT NULL,  
    incorrect_answers    TEXT [] NOT NULL,
    incorrect_answers_spanish TEXT [] NOT NULL,
    type                 question_type,
    module_id            INTEGER NOT NULL, 
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE TABLE user_profiles (
    id          SERIAL PRIMARY KEY,
    first_name  TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW (),
    updated_at  TIMESTAMP DEFAULT NOW (),
    user_id     INTEGER NOT NULL, 
    FOREIGN KEY (user_id) REFERENCES users(id)
);

INSERT INTO modules (name, description)
VALUES('Data Types','Learn Python data types.');

INSERT INTO modules (name, description)
VALUES('Variables','Learn Python variables.');

INSERT INTO modules (name, description)
VALUES('Conditionals','Learn Python conditionals.');

INSERT INTO modules (name, description)
VALUES('Lists','Learn Python data lists.');

INSERT INTO modules (name, description)
VALUES('Loops','Learn Python loops.');

INSERT INTO modules (name, description)
VALUES('Functions','Learn Python functions.');


-- Modules 1 data 
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 1);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 1);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 1);

-- Modules 2 data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 2);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 2);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 2);

-- Modules 3 data

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 3);

-- Modules 4 data

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 4);


-- Modules 5 data 

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 5);


-- Modules 6 data

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 6);