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
    incorrect_answers    TEXT [] NOT NULL,
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

INSERT INTO questions (question, answer, incorrect_answers, type, image_url, module_id)
VALUES('What is the correct way to create a Variable called "magical_number" and assign it the value 7.','spell1, spell2 = spell2, spell1',
ARRAY ['spell1.swap(spell2)', 'swap(spell1, spell2)'], 'select', 'http://localhost:5173/src/assets/quiz2_q11.png', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is the purpose of using Lists in Python?','Store collections of items',
ARRAY ['Store numbers with decimal points', 'Hold pairs of items', 'Create treasure maps'], 'select', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What can you use Dictionaries for in Python?','Holding information with unique keys',
ARRAY ['Storing numbers with decimal points', 'Answering True or False questions', 'Holding collections of items'], 'select', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which Data Type can be used to create a treasure map?','Dictionaries',
ARRAY ['Lists', 'Tuples', 'Numbers'], 'drag', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are Booleans used for in Python?',' Answer True or False questions',
ARRAY ['Hold words and sentences', 'Store information like an encyclopedia', 'Hold numbers and calculations'], 'select', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which Data Type can be used to count the stars in the night sky?','Numbers (Integers)',
ARRAY ['Booleans', 'Strings', 'Lists'], 'drag', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which Data Type can store a pair of items together?','Tuples',
ARRAY ['Dictionaries', 'Strings', 'Numbers'], 'drag', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are "Strings" in Python?','Magical potions that hold words and sentences',
ARRAY ['Collections of items like favorite toys', 'Numbers with decimal points', 'Pairs of items that stick together'], 'select', 1);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which Data Type can hold numbers with decimal points?','Floating-point numbers',
ARRAY ['Booleans', 'Strings', 'Lists'], 'drag', 1);


-- Modules 2 data


INSERT INTO questions (question, answer, incorrect_answers, type, image_url, module_id)
VALUES('What is the correct way to create a Variable called "magical_number" and assign it the value 7.','spell1, spell2 = spell2, spell1',
ARRAY ['spell1.swap(spell2)', 'swap(spell1, spell2)'], 'select', 'http://localhost:5173/src/assets/quiz2_q11.png', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('You found three enchanted gems and want to keep track of them. Create a list called "enchanted_gems" and store the names of the gems in it: "Opal," "Amethyst," and "Sapphire."','enchanted_gems = ["Opal", "Amethyst", "Sapphire"]',
ARRAY ['enchanted_gems = "Opal", "Amethyst", "Sapphire"', 'gem_list = ("Opal", "Amethyst", "Sapphire")','gem_list = "Opal", "Amethyst", "Sapphire"'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is the correct way to create a Variable called "magical_number" and assign it the value 7.','magical_number = 7',
ARRAY ['variable(magical_number) = 7', 'new Variable = magical_number(7)', 'magic = 7'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What else can you store in a Variable besides single values like Numbers and Strings?','Lists of items, such as a collection of spells',
ARRAY [' Only other Variables', 'Only Booleans', 'Only Numbers'], 'drag', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is a forgetfulness charm in the context of Variables?','A method to delete a Variable from Python memory',
ARRAY ['A magical spell to remember a Variables value forever', 'A way to change a Variable value without using code', 'A method to create new Variables'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('If you have a Variable called "apples" and another called "oranges," how can you find out the total number of fruits you have?','By creating a new Variable called "fruits" and assigning it the sum of "apples" and "oranges"',
ARRAY ['By adding the names of the Variables together', 'By deleting one of the Variables and keeping the other', 'By using a magical function that combines Variables'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('If you have a Variable called "apples" and another called "oranges," how can you find out the total number of fruits you have?','By creating a new Variable called "fruits" and assigning it the sum of "apples" and "oranges"',
ARRAY ['By adding the names of the Variables together', 'By deleting one of the Variables and keeping the other', 'By using a magical function that combines Variables'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('If you have a Variable called "apples" and another called "oranges," how can you find out the total number of fruits you have?','By creating a new Variable called "fruits" and assigning it the sum of "apples" and "oranges"',
ARRAY ['By adding the names of the Variables together', 'By deleting one of the Variables and keeping the other', 'By using a magical function that combines Variables'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('If you have a Variable called "apples" and another called "oranges," how can you find out the total number of fruits you have?','By creating a new Variable called "fruits" and assigning it the sum of "apples" and "oranges"',
ARRAY ['By adding the names of the Variables together', 'By deleting one of the Variables and keeping the other', 'By using a magical function that combines Variables'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How can you use Variables to perform calculations?','By combining Variables with magical math operations',
ARRAY ['By using Variables to store lists of items', 'By giving the Variable a unique name', 'By assigning a special Data Type to the Variable'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What can you store in a Variable?','All of the above',
ARRAY ['Booleans', 'Strings', 'Numbers'], 'drag', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Can you change the name of a Variable after it is created?','Nope!',
ARRAY ['Only if the Variable is storing a String.', 'Only if the Variable is storing a Number', 'Yes!'], 'drag', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How do you create a Variable in Python?','By giving it a special name and a Data Type',
ARRAY ['By using a built-in Python function', 'By using a forgetfulness charm', 'By naming it "Variable" in your code'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are Variables in Python?','Enchanted books in Python',
ARRAY ['Special names given to Python functions', 'Numbers with decimal points', 'Magical containers that hold treasures' ], 'select', 2);



-- Modules 3 data


-- Modules 4 data


-- Modules 5 data 


-- Modules 6 data