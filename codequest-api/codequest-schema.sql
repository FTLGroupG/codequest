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
VALUES('How can you use Variables to perform calculations?','By combining Variables with magical math operations',
ARRAY ['By using Variables to store lists of items', 'By giving the Variable a unique name', 'By assigning a special Data Type to the Variable'], 'select', 2);


INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Can you change the name of a Variable after it is created?','Nope!',
ARRAY ['Only if the Variable is storing a String.', 'Only if the Variable is storing a Number', 'Yes!'], 'drag', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What can you store in a Variable?','All of the above',
ARRAY ['Booleans', 'Strings', 'Numbers'], 'drag', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How do you create a Variable in Python?','By giving it a special name and a Data Type',
ARRAY ['By using a built-in Python function', 'By using a forgetfulness charm', 'By naming it "Variable" in your code'], 'select', 2);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are Variables in Python?','Enchanted books in Python',
ARRAY ['Special names given to Python functions', 'Numbers with decimal points', 'Magical containers that hold treasures' ], 'select', 2);



-- Modules 3 Conditionals data
INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How many times can you use the "if" statement in your code?','Only once',
ARRAY ['As many times as you want', 'Two times', 'Five times'], 'select', 3);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are the two parts of the "if" statement in Python?','If and Else',
ARRAY ['Sun and Moon', 'Left and Right', 'Start and End'], 'select', 3);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What happens when your guess is correct in the secret number guessing game?','You get a congratulatory message',
ARRAY ['You get a clue to try again', 'You get a secret code for the next level', ' You get a magic spellbook'], 'select', 3);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How can you create your secret code using conditionals?','By using the "if" statement',
ARRAY ['By using the "for" loop', 'By saying "Abracadabra"', 'By using the "while" loop'], 'select', 3);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is the mission in the detective task for QuestBot?','To crack the code and find the secret number',
ARRAY ['To become the best detective in the world', 'To eat ice cream', 'To learn the alphabet'], 'select', 3);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How does the "if" statement work in conditionals?','It runs the code inside the block if the condition is true',
ARRAY ['It always runs the code inside the block', 't runs the code inside the block if the condition is false', 'It makes QuestBot dance'], 'select', 3);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are conditionals in Python?','Superpowers for your code to make decisions',
ARRAY ['Bugs in your code', 'Decorations for your code', 'Magical potions for Python'], 'drag', 3);

-- Modules 4 Lists data
INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is the first index of a list in Python?','0',
ARRAY ['-1', '1', '10'], 'select', 4);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How can you remove an item from the list in Python?','gems_found.remove("Sapphire")',
ARRAY ['remove_item(gems_found, "Sapphire")', 'gems_found.delete("Sapphire")', 'delete_item(gems_found, "Sapphire")'], 'select', 4);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How do you sort the gems in the list in alphabetical order?','gems_found.sort()',
ARRAY ['sorted(gems_found)', 'sort(gems_found)', 'gems_found.order()'], 'select', 4);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What does the following "for" loop do in Python?, "It prints "Found a gem:" for each gem in the list" How can you add it to the existing list of gems?','gems_found.append("Opal")',
ARRAY ['It prints "Found a gem" once', 'It prints the total number of gems found', 'It prints "Found a gem:" for the last gem only'], 'select', 4);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('PythonBot wants to count the number of gems found. Which method will you use?','len(gems_found)',
ARRAY ['count_gems(gems_found)', 'gems_found.count()', 'total_gems(gems_found)'], 'select', 4);


INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('QuestBot discovers a new gem, "Opal." How can you add it to the existing list of gems?','gems_found.append("Opal")',
ARRAY ['gems_found.add("Opal")', 'gems_found.insert("Opal")', 'gems_found.extend("Opal")'], 'select', 4);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How do you access items in a list in Python?','By using indexing, starting from 0',
ARRAY ['By using the "print" statement', 'By using the "if" statement', 'By using a magnifying glass'], 'select', 4);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is a list in Python?','A magical backpack for storing multiple items',
ARRAY ['A type of colorful snake', 'A secret map to hidden treasures', 'A powerful spellbook'], 'drag', 4);


-- Modules 5 Loops data 
INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What are loops in Python?','Repetition of a set of instructions',
ARRAY ['Magical spells that create colorful patterns', 'Instructions that are followed only once', 'Circular objects like wheels'], 'drag', 5);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which type of loop goes through a list of items one by one?','For loop',
ARRAY ['While loop'], 'select', 5);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Can you use loops to solve real-world problems?','Yes, loops are powerful tools for solving many tasks',
ARRAY ['No, loops are only used for fun'], 'drag', 5);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is the purpose of using loops in coding?','To repeat a set of instructions efficiently',
ARRAY ['To confuse others with complex patterns', 'To make the code look fancy'], 'select', 5);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which loop would you use to repeat an action until a certain condition becomes false?','While loop',
ARRAY ['For loop', 'If statement', 'Else loop'], 'select', 5);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is the purpose of an index variable in a loop?','To keep track of the current loop iteration',
ARRAY ['To store the total number of iterations', 'To calculate the sum of all values in the loop'], 'select', 5);

-- Modules 6 Functions data
INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is a function in Python?','A set of instructions with a name',
ARRAY ['A robot friend', 'A magic spell', 'A delicious cake'], 'select', 6);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('How do you create a function in Python?','By giving it a name and instructions',
ARRAY ['By creating a robot friend', 'By saying "Hello, future coders!"', 'By learning magic spells'], 'select', 6);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What is a parameter in a function?','Extra instructions for your robot friend',
ARRAY ['A way to bake a cake', 'A magic potion', 'The name of the function'], 'drag', 6);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which of the following is a valid function definition in Python?','def my_function():',
ARRAY ['def my_function:', 'function my_function():', 'create my_function():'], 'select', 6);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('What happens if you don''t call a function after defining it in Python?','Nothing happens until you call the function.',
ARRAY ['The function will get angry and refuse to work.', 'Your computer will freeze.', 'The function will automatically execute.'], 'select', 6);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Can a function have multiple parameters in Python?',' Yes, a function can have any number of parameters.',
ARRAY ['No, a function can only have one parameter.', 'Yes, but only if they are all of the same type.', 'Yes, but only if they are numbers.'], 'select', 6);

INSERT INTO questions (question, answer, incorrect_answers, type, module_id)
VALUES('Which of the following is the correct way to call the function calculate_area with parameters ''width'' and ''height''?','calculate_area(width, height)',
ARRAY ['function calculate_area(width, height)', 'call calculate_area(width, height)', 'calculate_area width, height'], 'select', 6);


-- Fix this error: Cannot set headers after they are sent to the client
-- Fix: A drag question type followed by another keeps the previous answer in the box
