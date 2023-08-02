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
    resources      TEXT [],
    placeholder    TEXT []
);

CREATE TYPE question_type AS ENUM ('select', 'drag');

CREATE TABLE questions (
    id                   SERIAL PRIMARY KEY,
    question             TEXT NOT NULL,
    answer               TEXT NOT NULL,
    options    TEXT [] NOT NULL,
    type                 question_type,
    image_url            TEXT,
    module_id            INTEGER NOT NULL, 
    FOREIGN KEY (module_id) REFERENCES modules(id)
);

CREATE TABLE user_profiles (
    id          SERIAL PRIMARY KEY,
    first_name  TEXT NOT NULL,
    created_at  TIMESTAMP DEFAULT NOW (),
    updated_at  TIMESTAMP DEFAULT NOW (),
    user_email     TEXT NOT NULL, 
    FOREIGN KEY (user_email) REFERENCES users(email)
);

CREATE TABLE userprogress (
    id                     SERIAL PRIMARY KEY,
    user_profile_id                INTEGER NOT NULL,
    FOREIGN KEY (user_profile_id)  REFERENCES user_profiles(id),
    module_one             BOOLEAN DEFAULT 'f',
    module_two             BOOLEAN DEFAULT 'f',
    module_three           BOOLEAN DEFAULT 'f',
    module_four            BOOLEAN DEFAULT 'f',
    module_five            BOOLEAN DEFAULT 'f',
    module_six             BOOLEAN DEFAULT 'f'
);


INSERT INTO modules (name, description, resources, placeholder)
VALUES('Data Types','Learn Python data types.', array ['https://www.w3schools.com/python/python_datatypes.asp', 'https://www.programiz.com/python-programming/variables-datatypes', 'https://www.w3schools.com/python/python_numbers.asp', 'https://realpython.com/python-numbers/', 'https://www.programiz.com/python-programming/methods/built-in/float', 'https://blog.hubspot.com/website/float-python', 'https://www.geeksforgeeks.org/boolean-data-type-in-python/', 'https://www.w3schools.com/python/python_booleans.asp', 'https://www.w3schools.com/python/python_strings.asp', 'https://www.w3schools.com/python/python_strings_methods.asp', 'https://www.w3schools.com/python/python_strings_slicing.asp'], array ['Python Data Types', 'Learn more on Data Types', 'Python Number Type', 'Learn More on Numbers', 'Python Floats', 'Learn more on Python Floats', 'Boolean Data Type', 'How to use Booleans', 'Python Strings', 'Built-in methods for strings', 'Slicing Strings']);

INSERT INTO modules (name, description, resources, placeholder)
VALUES('Variables','Learn Python variables.', array ['https://www.w3schools.com/python/python_variables.asp', 'https://www.w3schools.com/python/python_variables_names.asp', 'https://www.w3schools.com/python/python_variables_global.asp'], array ['Python Variables', 'Variable Names', 'Global Variables']);

INSERT INTO modules (name, description, resources, placeholder)
VALUES('Conditionals','Learn Python conditionals.', array ['https://realpython.com/python-conditional-statements/', 'https://www.freecodecamp.org/news/how-to-use-conditional-statements-if-else-elif-in-python/', 'https://www.w3schools.com/python/python_conditions.asp'], array ['Conditional Statements in Python', 'If, Else, Elif Conditionals', 'Interactive Lesson on Conditionals']);

INSERT INTO modules (name, description, resources, placeholder)
VALUES('Lists','Learn Python data lists.', array ['https://www.programiz.com/python-programming/list', 'https://www.geeksforgeeks.org/python-lists/', 'https://www.w3schools.com/python/python_lists.asp', 'https://www.w3schools.com/python/python_lists_access.asp', 'https://www.w3schools.com/python/python_lists_change.asp', 'https://www.w3schools.com/python/python_lists_add.asp', 'https://www.w3schools.com/python/python_lists_remove.asp', 'https://www.w3schools.com/python/python_lists_methods.asp'], array ['Learn more about Python Lists', 'Python Lists', 'Interactive lesson on Python Lists', 'Accessing items in a list', 'Changing items in a list', 'Adding items to a list', 'Removing items from a list', 'Built-in methods for lists']);

INSERT INTO modules (name, description, resources, placeholder)
VALUES('Loops','Learn Python loops.', array ['https://www.programiz.com/python-programming/for-loop', 'https://www.w3schools.com/python/python_for_loops.asp', 'https://www.w3schools.com/python/python_while_loops.asp'], array ['For Loops', 'Interactive Lesson on For Loops', 'Learn More about While Loops']);

INSERT INTO modules (name, description, resources, placeholder)
VALUES('Functions','Learn Python functions.', array ['https://www.programiz.com/python-programming/function', 'https://www.geeksforgeeks.org/python-functions/', 'https://www.w3schools.com/python/python_functions.asp'], array ['Learn More about Python Functions', 'What are Python Functions?', 'Interactive Lesson on Python Functions']);


-- Modules 1 data 
INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 1);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number', 'a true or false'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 1);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 1);

-- Modules 2 Variables data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 2);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number', 'a true or false'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 2);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 2);

-- Modules 3 Conditionals data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number', 'a true or false'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 3);

-- Modules 4 Lists data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number', 'a true or false'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, options, options_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean', 'Integer'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 4);


-- Modules 5 Loops data 
INSERT INTO questions (question, answer, options, type, module_id)
VALUES('What are loops in Python?','Repetition of a set of instructions',
ARRAY ['Magical spells that create colorful patterns', 'Repetition of a set of instructions', 'Instructions that are followed only once', 'Circular objects like wheels'], 'select', 5);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('Which type of loop goes through a list of items one by one?','For loop',
ARRAY ['While loop', 'For loop'], 'select', 5);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('Can you use loops to solve real-world problems?','Yes, loops are powerful tools for solving many tasks',
ARRAY ['No, loops are only used for fun', 'Yes, loops are powerful tools for solving many tasks'], 'select', 5);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('What is the purpose of using loops in coding?','To repeat a set of instructions efficiently',
ARRAY ['To confuse others with complex patterns', 'To make the code look fancy', 'To repeat a set of instructions efficiently'], 'select', 5);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('Which loop would you use to repeat an action until a certain condition becomes false?','While loop',
ARRAY ['For loop', 'If statement', 'Else loop', 'While loop'], 'select', 5);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('What is the purpose of an index variable in a loop?','To keep track of the current loop iteration',
ARRAY ['To store the total number of iterations', 'To calculate the sum of all values in the loop', 'To keep track of the current loop iteration'], 'select', 5);

-- Modules 6 Functions data
INSERT INTO questions (question, answer, options, type, module_id)
VALUES('What is a function in Python?','A set of instructions with a name',
ARRAY ['A robot friend', 'A magic spell', 'A delicious cake'], 'select', 6);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('How do you create a function in Python?','By giving it a name and instructions',
ARRAY ['By creating a robot friend', 'By saying "Hello, future coders!"', 'By learning magic spells'], 'select', 6);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('What is a parameter in a function?','Extra instructions for your robot friend',
ARRAY ['A way to bake a cake', 'A magic potion', 'The name of the function'], 'select', 6);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('Which of the following is a valid function definition in Python?','def my_function():',
ARRAY ['def my_function:', 'function my_function():', 'create my_function():'], 'select', 6);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('What happens if you don''t call a function after defining it in Python?','Nothing happens until you call the function.',
ARRAY ['The function will get angry and refuse to work.', 'Your computer will freeze.', 'The function will automatically execute.'], 'select', 6);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('Can a function have multiple parameters in Python?',' Yes, a function can have any number of parameters.',
ARRAY ['No, a function can only have one parameter.', 'Yes, but only if they are all of the same type.', 'Yes, but only if they are numbers.'], 'select', 6);

INSERT INTO questions (question, answer, options, type, module_id)
VALUES('Which of the following is the correct way to call the function calculate_area with parameters ''width'' and ''height''?','calculate_area(width, height)',
ARRAY ['function calculate_area(width, height)', 'call calculate_area(width, height)', 'calculate_area width, height'], 'select', 6);



-- Fix this error: Cannot set headers after they are sent to the client
-- Fix: A drag question type followed by another keeps the previous answer in the box
