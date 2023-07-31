import React from "react";
import "./Curriculum.css";
import { Link, useParams, Outlet, Navigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import Quiz from "../Quiz/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import ProfileContext from "../../contexts/profile";
import LottieAnimation from "../AnimationComponent/AnimationComponent"; // Import the LottieAnimation component
import animation1 from "/src/assets/spyAnimation.json"
import animation2 from "/src/assets/treasureAnimation.json"
import animation3 from "/src/assets/bookAnimation.json"
import animation4 from "/src/assets/diamondAnimation.json"


export default function Curriculum() {
  const { id } = useParams();
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const {
    selectedProfile,
    setSelectedProfile,
    userProgress,
    setUserProgress,
    leftOff,
    setLeftOff,
  } = useContext(ProfileContext);
  const buttons = (
    <div className="curriculumCardButtonCard">
      <button className="curriculumCardButton">Back</button>
      <Link to={`/modules/${id}/curriculum/finished`}>
        <button className="curriculumCardButton">Next</button>
      </Link>
    </div>
  );

  // Store the leftOff value in localStorage
  useEffect(() => {
    if (leftOff) {
      localStorage.setItem("leftOff", leftOff);
    }
    setLeftOff(localStorage.getItem("leftOff"));
  }, [leftOff]);
  return (
    <div className="Curriculum">
      {user.email && !selectedProfile && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      <div className="curriculumCard">
        {id == 1 ? (
          <>
            <h2>Learn Python</h2>
            <h1>Data Types</h1>
            <div className="curriculumCardCode">
              <code>
                {/* coffee_price = 1.50
                    number_of_coffees = 4
                    # Prints "6.0"
                    print(coffee_price * number_of_coffees)
                    # Prints "1.5"
                    print(coffee_price)
                    # Prints "4"
                    print(number_of_coffees)
                    # Updating the price
                    coffee_price = 2.00
                    # Prints "8.0"
                    print(coffee_price * number_of_coffees)
                    # Prints "2.0"
                    print(coffee_price)
                    # Prints "4"
                    print(number_of_coffees) */}
              </code>
            </div>
            <div className="curriculumCardText">
              <h3>What is a data type?</h3>
              <br />
              <p>
                "Hey there, young coders! Today, let's talk about data types in
                Python. Imagine you have a magical box to store different
                things. Just like that, in Python, we have different types of
                boxes to store different kinds of information. For example, we
                have a box called 'integer' to store whole numbers like 5 or 10.
                We also have a box called 'float' to store numbers with
                decimals, like 3.14. Then, we have a box called 'string' to
                store words and sentences, like 'hello' or 'I love pizza.' Oh,
                and there's even a box called 'boolean' that can only hold two
                things: True or False. These boxes help us organize and work
                with data in our programs. Isn't that cool?"
              </p>
              <br />
              {/* <p>
                "Now, let's imagine you're playing a game where you need to keep
                track of your score. You can use a box called 'variable' to
                store your score. Variables are like special boxes that can hold
                different types of data. So, you can use an integer variable to
                store your score as a number. But what if you want to add your
                name to the score? You can use a string variable to hold your
                name.{" "}
                {/*Python is smart, so it knows which type of data is inside
                each variable. This way, you can do different things with your
                score, like adding or subtracting numbers or even combining your
                name with the score. It's like having different boxes for
                different things, all inside your program!" Remember, you can
                use these different data types and variables to solve all sorts
                of problems and create amazing things with Python. Happy coding!
              </p> */}
              <br />
              {/* <ul>
                <li>Integers</li>
                <li>Strings</li>
                <li>Floats</li>
                <li>Booleans</li>
              </ul> */}
              {buttons}
            </div>
          </>
        ) : (
          <>
            {user.email ? (
              <>
                {id == 2 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Variables</h1>
                    <div className="curriculumCardText">
                      <h3>What are Variables?</h3>
                      <br />
                      <p>
                        "Hey there, young coders! Today, let's talk about data
                        types in Python. Imagine you have a magical box to store
                        different things. Just like that, in Python, we have
                        different types of boxes to store different kinds of
                        information. For example, we have a box called 'integer'
                        to store whole numbers like 5 or 10. We also have a box
                        called 'float' to store numbers with decimals, like
                        3.14. Then, we have a box called 'string' to store words
                        and sentences, like 'hello' or 'I love pizza.' Oh, and
                        there's even a box called 'boolean' that can only hold
                        two things: True or False. These boxes help us organize
                        and work with data in our programs. Isn't that cool?"
                      </p>
                      <br />
                      <p>
                        "Now, let's imagine you're playing a game where you need
                        to keep track of your score. You can use a box called
                        'variable' to store your score. Variables are like
                        special boxes that can hold different types of data. So,
                        you can use an integer variable to store your score as a
                        number. But what if you want to add your name to the
                        score? You can use a string variable to hold your name.
                        Python is smart, so it knows which type of data is
                        inside each variable. This way, you can do different
                        things with your score, like adding or subtracting
                        numbers or even combining your name with the score. It's
                        like having different boxes for different things, all
                        inside your program!" Remember, you can use these
                        different data types and variables to solve all sorts of
                        problems and create amazing things with Python. Happy
                        coding!
                      </p>
                      <br />
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 3 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Conditionals</h1>
                    <div className="curriculumCardText">
                      <h3>Fun with Conditionals in Python</h3>
                      <br />
                      <p>
                      What are Conditionals? <br></br>
Conditionals are like "if" questions for your computer. They help your code decide what to do based on certain conditions. Think of it as your code's superpower - making it smarter and more interactive! Let's see how it works with our secret code-breaking mission.
                      </p>
                      <LottieAnimation animationData={animation1} />
                      <p>
                      Detective Task: Guess the Secret Number <br></br>
We've intercepted a coded message from the evil mastermind Dr. Enigma! Your mission is to help our detective PythonBot guess the secret number. Here's how it works:
                      </p>

                      <img src="/src/assets/conditionalsCodeSnippet1.png" className="codeSnippet"></img>

                      <p>
                      Let's Understand the Code: <br></br>
In the code, we set a secret number and ask the player (that's you!) to guess the number. The "if" statement checks if your guess is equal to the secret number. If it is, you cracked the code and get a congratulatory message! If not, you'll get a clue to try again. Keep guessing until you unlock the secret!
                      </p>
                      <p>
                      Let's Make Choices with "if" and "else" <br></br>
In our secret code-breaking mission, PythonBot used the "if" and "else" statements to make choices. When your guess is correct, the "if" block runs, and if your guess is wrong, the "else" block runs. It's like magic, right?
                      </p>
                      <p>
                      Your Turn: Create Your Secret Code <br></br>
Now it's your turn to be the mastermind! Use conditionals to create your secret code. You can make a guessing game like we did or make your own fun adventure with PythonBot!
                      </p>
                      <p>
                      Unlock the Treasure Challenge: <br></br>
Let's have some more fun! PythonBot has reached a treasure chest, but it's locked with a secret code. Help PythonBot crack the code using conditionals, and the treasure will be all yours!
                      </p>
                      <LottieAnimation animationData={animation2} />
                      <iframe src="https://trinket.io/embed/python/795f03c073" width="100%" height="356" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 4 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Lists</h1>
                    <div className="curriculumCardText">
                      <h3>Fun with Lists in Python</h3>
                      <br />
                      <p>
                      What are Lists? <br></br>
Imagine you're going on an epic adventure, and you want to keep a record of all the cool stuff you find. A list is like your adventure journal, where you can write down everything you've discovered. Similarly, in Python, lists can store multiple items, such as numbers, words, or even other lists!
                      </p>
                      <LottieAnimation animationData={animation3} />
                      <p>
                      Creating a List: <br></br>
Let's see how PythonBot creates a list of gems found during the quest:
                      </p>
                      <p>
                      Accessing Items in the List: <br></br>
PythonBot wants to know what the first gem found was. In Python, we use "indexing" to access items in a list. The first item has an index of 0, the second has an index of 1, and so on.
                      </p>
                      <p>
                      Adding More Gems: <br></br>
On the quest, PythonBot discovers a new gem, the "Topaz." Let's add it to the list:
                      </p>
                      <LottieAnimation animationData={animation4} />
                      <p>
                      Counting the Gems: <br></br>
PythonBot wants to know how many gems have been found. Python can easily count the items in a list for us:
                      </p>
                      <p>
                      Your Turn: Customize Your Quest <br></br>
Create your own adventure! Make a list of items you'll discover during your journey. You can have gems, magical creatures, or even planets in your list. Let your imagination run wild!
                      </p>
                      <p>
                      Magic with "for" Loop: <br></br>
PythonBot learns a powerful spell, the "for" loop, to go through the list and find all the gems:
                      </p>
                      <p>
                      Sorting the Gems: <br></br>
PythonBot wants to arrange the gems alphabetically. Python can sort the list for us:
                      </p>
                      <p>
                      Great job, young adventurers! You've conquered the world of Python Lists and can now organize your data like a pro! Remember, lists are incredible tools that make coding even more exciting and adventurous!
                      </p>
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 5 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Loops</h1>
                    <div className="curriculumCardText">
                      <h3>Round and Round we go!</h3>
                      <br />
                      <p>
                        "Hi there, young programmers! Let's talk about loops in
                        Python. Have you ever had to do a task repeatedly? Well,
                        loops help us with that! In Python, loops are like a set
                        of instructions that we can repeat over and over again
                        without writing them multiple times. There are two types
                        of loops we'll learn: 'while' and 'for' loops. 'While'
                        loops keep going until a condition is no longer true.
                        It's like saying, 'Keep doing this until something
                        changes!' For example, you can keep counting as long as
                        the number is less than 10. 'For' loops, on the other
                        hand, have a fixed number of times to repeat. They're
                        like saying, 'Do this a certain number of times!' For
                        instance, you can repeat an action five times. Loops are
                        super helpful because they make our programs more
                        efficient and save us time. Happy coding with loops!"
                      </p>
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 6 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Functions</h1>
                    <div className="curriculumCardText">
                      <h3>What are Functions?</h3>
                      <br />
                      <p>
                        "Imagine you're a chef in a big kitchen, preparing a
                        delicious meal. Each dish requires a series of steps,
                        like chopping vegetables, stirring sauces, and baking in
                        the oven. In Python, functions are like your recipe
                        instructions! You can create a function called
                        'chopVegetables' that specifies how to chop them,
                        another function called 'stirSauce' that explains how to
                        mix ingredients, and so on. Functions help you organize
                        your cooking process, making it easier to follow and
                        reuse specific steps. Just like a chef relies on recipes
                        to create amazing dishes, programmers use functions to
                        create incredible programs. So put on your chef's hat
                        and start cooking up some fantastic code with functions
                        in Python!"
                      </p>
                      {buttons}
                    </div>
                  </main>
                )}
              </>
            ) : (
              <AccessForbidden />
            )}
          </>
        )}
      </div>
    </div>
  );
}
