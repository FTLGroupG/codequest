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

INSERT INTO modules (name, description, resources)
VALUES('Data Types','Learn Python data types.', array ['https://www.w3schools.com/python/python_datatypes.asp', 'https://www.programiz.com/python-programming/variables-datatypes', 'https://realpython.com/python-data-types/', 'https://www.w3schools.com/python/python_numbers.asp', 'https://realpython.com/python-numbers/', 'https://blog.hubspot.com/website/float-python', 'https://www.programiz.com/python-programming/methods/built-in/float', 'https://www.geeksforgeeks.org/boolean-data-type-in-python/', 'https://www.w3schools.com/python/python_booleans.asp', 'https://www.w3schools.com/python/python_strings.asp', 'https://www.w3schools.com/python/python_strings_escape.asp', 'https://www.w3schools.com/python/python_strings_methods.asp', 'https://www.w3schools.com/python/python_strings_slicing.asp']);

INSERT INTO modules (name, description, resources)
VALUES('Variables','Learn Python variables.', array ['https://www.w3schools.com/python/python_variables.asp', 'https://realpython.com/python-variables/', 'https://www.w3schools.com/python/python_variables_names.asp', 'https://www.w3schools.com/python/python_variables_global.asp']);

INSERT INTO modules (name, description, resources)
VALUES('Conditionals','Learn Python conditionals.', array ['https://realpython.com/python-conditional-statements/', 'https://www.freecodecamp.org/news/how-to-use-conditional-statements-if-else-elif-in-python/', 'https://www.w3schools.com/python/python_conditions.asp']);

INSERT INTO modules (name, description, resources)
VALUES('Lists','Learn Python data lists.', array ['https://www.programiz.com/python-programming/list', 'https://www.geeksforgeeks.org/python-lists/', 'https://www.w3schools.com/python/python_lists.asp', 'https://www.w3schools.com/python/python_lists_access.asp', 'https://www.w3schools.com/python/python_lists_change.asp', 'https://www.w3schools.com/python/python_lists_add.asp', 'https://www.w3schools.com/python/python_lists_remove.asp', 'https://www.w3schools.com/python/python_lists_methods.asp']);

INSERT INTO modules (name, description, resources)
VALUES('Loops','Learn Python loops.', array ['https://www.programiz.com/python-programming/for-loop', 'https://www.w3schools.com/python/python_for_loops.asp', 'https://www.w3schools.com/python/python_while_loops.asp']);

INSERT INTO modules (name, description, resources)
VALUES('Functions','Learn Python functions.', array ['https://www.programiz.com/python-programming/function', 'https://www.geeksforgeeks.org/python-functions/', 'https://www.w3schools.com/python/python_functions.asp']);


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

-- Modules 2 Variables data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 2);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a boolean?','a true or false', 'Que es un booleano?', 'un true o falso',
ARRAY ['a text', 'an integer', 'a decimal number'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 2);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('A data type that represents a whole number is a(n)','Integer','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Float', 'String', 'Boolean'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 2);

-- Modules 3 Conditionals data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How many times can you use the "if" statement in your code?','Only once','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['As many times as you want', 'Two times', 'Five times'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What are the two parts of the "if" statement in Python?','If and Else','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Sun and Moon', 'Left and Right', 'Start and End'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What happens when your guess is correct in the secret number guessing game?','You get a congratulatory message','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['You get a clue to try again', 'You get a secret code for the next level', ' You get a magic spellbook'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How can you create your secret code using conditionals?','By using the "if" statement','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['By using the "for" loop', 'By saying "Abracadabra"', 'By using the "while" loop'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is the mission in the detective task for QuestBot?','To crack the code and find the secret number','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['To become the best detective in the world', 'To eat ice cream', 'To learn the alphabet'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How does the "if" statement work in conditionals?','It runs the code inside the block if the condition is true', 'Que es un booleano?', 'un true o falso',
ARRAY ['It always runs the code inside the block', 't runs the code inside the block if the condition is false', 'It makes QuestBot dance'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 3);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What are conditionals in Python?','Superpowers for your code to make decisions','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Bugs in your code', 'Decorations for your code', 'Magical potions for Python'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 3);

-- Modules 4 Lists data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is the first index of a list in Python?','0','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['-1', '1', '10'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How can you remove an item from the list in Python?','gems_found.remove("Sapphire")','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['remove_item(gems_found, "Sapphire")', 'gems_found.delete("Sapphire")', 'delete_item(gems_found, "Sapphire")'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How do you sort the gems in the list in alphabetical order?','gems_found.sort()','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['sorted(gems_found)', 'sort(gems_found)', 'gems_found.order()'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What does the following "for" loop do in Python?, "It prints "Found a gem:" for each gem in the list" How can you add it to the existing list of gems?','gems_found.append("Opal")','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['It prints "Found a gem" once', 'It prints the total number of gems found', 'It prints "Found a gem:" for the last gem only'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('PythonBot wants to count the number of gems found. Which method will you use?','len(gems_found)','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['count_gems(gems_found)', 'gems_found.count()', 'total_gems(gems_found)'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);


INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('QuestBot discovers a new gem, "Opal." How can you add it to the existing list of gems?','gems_found.append("Opal")','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['gems_found.add("Opal")', 'gems_found.insert("Opal")', 'gems_found.extend("Opal")'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How do you access items in a list in Python?','By using indexing, starting from 0', 'Que es un booleano?', 'un true o falso',
ARRAY ['By using the "print" statement', 'By using the "if" statement', 'By using a magnifying glass'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 4);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a list in Python?','A magical backpack for storing multiple items','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['A type of colorful snake', 'A secret map to hidden treasures', 'A powerful spellbook'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 4);


-- Modules 5 Loops data 
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What are loops in Python?','Repetition of a set of instructions','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['Magical spells that create colorful patterns', 'Instructions that are followed only once', 'Circular objects like wheels'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('Which type of loop goes through a list of items one by one?','For loop', 'Que es un booleano?', 'un true o falso',
ARRAY ['While loop'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('Can you use loops to solve real-world problems?','Yes, loops are powerful tools for solving many tasks','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['No, loops are only used for fun'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is the purpose of using loops in coding?','To repeat a set of instructions efficiently','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['To confuse others with complex patterns', 'To make the code look fancy'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('Which loop would you use to repeat an action until a certain condition becomes false?','While loop','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['For loop', 'If statement', 'Else loop'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 5);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is the purpose of an index variable in a loop?','To keep track of the current loop iteration','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['To store the total number of iterations', 'To calculate the sum of all values in the loop'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 5);

-- Modules 6 Functions data
INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a function in Python?','A set of instructions with a name','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['A robot friend', 'A magic spell', 'A delicious cake'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('How do you create a function in Python?','By giving it a name and instructions', 'Que es un booleano?', 'un true o falso',
ARRAY ['By creating a robot friend', 'By saying "Hello, future coders!"', 'By learning magic spells'], ARRAY [ 'un texto', 'un entero', 'un decimal'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What is a parameter in a function?','Extra instructions for your robot friend','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['A way to bake a cake', 'A magic potion', 'The name of the function'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'drag', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('Which of the following is a valid function definition in Python?','def my_function():','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['def my_function:', 'function my_function():', 'create my_function():'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('What happens if you don''t call a function after defining it in Python?','Nothing happens until you call the function.','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['The function will get angry and refuse to work.', 'Your computer will freeze.', 'The function will automatically execute.'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('Can a function have multiple parameters in Python?',' Yes, a function can have any number of parameters.','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['No, a function can only have one parameter.', 'Yes, but only if they are all of the same type.', 'Yes, but only if they are numbers.'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 6);

INSERT INTO questions (question, answer, question_spanish, answer_spanish, incorrect_answers, incorrect_answers_spanish, type, module_id)
VALUES('Which of the following is the correct way to call the function calculate_area with parameters ''width'' and ''height''?','calculate_area(width, height)','El tipo de dato que representa a un numero es un','Entero',
ARRAY ['function calculate_area(width, height)', 'call calculate_area(width, height)', 'calculate_area width, height'], ARRAY [ 'Flotante', 'Texto', 'Booleano'], 'select', 6);


-- Fix this error: Cannot set headers after they are sent to the client
-- Fix: A drag question type followed by another keeps the previous answer in the box