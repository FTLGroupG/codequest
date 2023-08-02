import React from "react";
import "./Curriculum.css";
import { Link, useParams, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import AuthContext from "../../contexts/auth";
import AccessForbidden from "../AccessForbidden/AccessForbidden";
import ProfileContext from "../../contexts/profile";
import LottieAnimation from "../AnimationComponent/AnimationComponent";
import animation1 from "/src/assets/spyAnimation.json";
import animation2 from "/src/assets/treasureAnimation.json";
import animation3 from "/src/assets/bookAnimation.json";
import animation4 from "/src/assets/diamondAnimation.json";
import animation5 from "/src/assets/boxAnimation.json";
import animation6 from "/src/assets/loopAnimation.json";
import animation7 from "/src/assets/chefAnimation.json";

export default function Curriculum() {
  const { id } = useParams();
  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const { selectedProfile, leftOff, setLeftOff } = useContext(ProfileContext);
  const buttons = (
    <div className="curriculumCardButtonCard">
      <Link to={`/modules/${id}/curriculum/finished`}>
        <button className="curriculumCardButton">Go to Quiz</button>
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
      {user.email && !localStorage.getItem("selectedProfile") && (
        <Navigate to="/account-profiles" replace={true} />
      )}
      <div className="curriculumCard">
        {id == 1 ? (
          <main>
            <h2>Learn Python</h2>
            <h1>Data Types</h1>
            <div className="curriculumCardAnimation">
              <LottieAnimation animationData={animation5} />
            </div>
            <div className="curriculumCardText">
              <h3>Lesson 1: Fun with Data Types in Python</h3>
              <br />
              <div className="curriculumFlex">
                <p>
                  Welcome young learners, to the magical world of coding with
                  Python! Today, we will embark on an exciting journey to
                  explore the enchanted land of Data Types!
                </p>
              </div>
              <p>
                Imagine you have a treasure chest, and it can hold all sorts of
                things - toys, candies, and even your dreams! In the Python
                world, just like this chest, we have different types to hold
                different kinds of treasures - these are called "Data Types."
              </p>
              <h2>Numbers</h2>
              <p>
                Let's start with the most magical Data Type of all: "Numbers!"
                You can use Numbers to count the stars in the night sky or the
                number of friends you have. There are two types of Numbers in
                Python: whole numbers (integers) and numbers with decimal points
                (floating-point numbers). Integers are like wizards without
                wings, while floating-point numbers are like wizards with wings!
              </p>

              <div className="iframe-wrap">
                <iframe
                  src="https://trinket.io/embed/python/faa4f9b371"
                  width="100%"
                  height="356"
                  frameBorder="0"
                  marginWidth="0"
                  marginHeight="0"
                  allowFullScreen
                ></iframe>
              </div>

              <h2>Strings</h2>
              <p>
                Next, we have the "Strings" - a sparkling and colorful Data
                Type! Strings are like potions that hold words, sentences, or
                even secrets! You can use Strings to talk to your friends,
                create stories, or even write spells! For example, "Abracadabra"
                is a magical String!
              </p>

              <div className="iframe-wrap">
                <iframe
                  src="https://trinket.io/embed/python/e759094acf"
                  width="100%"
                  height="356"
                  frameBorder="0"
                  marginWidth="0"
                  marginHeight="0"
                  allowFullScreen
                ></iframe>
              </div>

              <h2>Boolean</h2>
              <p>
                Now, let's discover the "Booleans" - the guardians of True and
                False! Booleans can answer questions like, "Is the sky blue?" or
                "Do unicorns exist?" They are like magical knights that protect
                the truth!
              </p>

              <div className="iframe-wrap">
                <iframe
                  src="https://trinket.io/embed/python/5a785a2821?runOption=run"
                  width="100%"
                  height="356"
                  frameborder="0"
                  marginwidth="0"
                  marginheight="0"
                  allowfullscreen
                ></iframe>
              </div>

              <h2>Lists</h2>
              <p>
                Moving on to the "Lists" - a treasure map leading to many
                things! Lists are collections of items, just like your favorite
                toys. You can put toys, candy names, or even your friends' names
                in a List! If you want to learn magic spells, create a List of
                spells!
              </p>

              <div className="iframe-wrap">
                <iframe
                  src="https://trinket.io/embed/python/6323111729?runOption=run&start=result"
                  width="100%"
                  height="356"
                  allowFullScreen
                ></iframe>
              </div>

              <h2>Tuples</h2>
              <p>
                Now, let's meet the "Tuples" - a pair of magical socks! Tuples
                are like pairs of items that stick together. You can use them to
                store things like the X and Y coordinates of a magical map or
                the latitude and longitude of a treasure island!
              </p>

              <div className="iframe-wrap">
                <iframe
                  src="https://trinket.io/embed/python/1a5b6f247d?runOption=run&start=result"
                  width="100%"
                  height="356"
                  allowFullScreen
                ></iframe>
              </div>

              <h2>Dictionaries</h2>
              <p>
                Finally, we have the "Dictionaries" - a magical library with
                enchanted books! Dictionaries hold information like a magical
                encyclopedia. Each piece of information has a unique key, just
                like a unique spell that unlocks a treasure chest!
              </p>

              <div className="iframe-wrap">
                <iframe
                  src="https://trinket.io/embed/python/7bfca55261?runOption=run"
                  width="100%"
                  height="356"
                  allowFullScreen
                ></iframe>
              </div>

              <LottieAnimation animationData={animation2} />
              {buttons}
            </div>
          </main>
        ) : (
          <>
            {user.email ? (
              <>
                {id == 2 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Variables</h1>
                    <div className="curriculumCardText">
                      <h3>
                        Lesson 2: Unleash the Magic of Variables in Python
                      </h3>
                      <br />
                      <div className="curriculumFlex">
                        <p>
                          Greetings, young wizards! Now that you've learned
                          about the fascinating world of Data Types, it's time
                          to take your coding journey to the next level by
                          exploring the enchanting concept of Variables in
                          Python!
                        </p>
                      </div>
                      <p>
                        Imagine Variables as magical containers that can hold
                        any treasure you desire. These treasures can be numbers,
                        words, or even mysterious spells! Variables are like
                        your very own magical backpack, allowing you to carry
                        all sorts of goodies with you.
                      </p>
                      <p>
                        To create a Variable in Python, you need to give it a
                        special name, just like a magical incantation. You can
                        name your Variables anything you like, such as "wand,"
                        "unicorn," or "spellbook"! But remember, once you give a
                        name to your Variable, you can't change it. It's like
                        assigning a unique name to a magical artifact that
                        you'll use throughout your quest!
                      </p>
                      <h2>Numbers</h2>
                      <p>
                        Now, let's learn how to use Variables to store Numbers.
                        For example, you can have a Variable named "potions" and
                        store the number of magical potions you have in it. If
                        you find a new potion, you can update the Variable with
                        the new quantity. Variables make it easy to keep track
                        of your magical possessions!
                      </p>

                      <div className="iframe-wrap">
                        <iframe
                          src="https://trinket.io/embed/python/7b60fe8cdc?runOption=run"
                          width="100%"
                          height="356"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <h2>Strings</h2>
                      <p>
                        Next, let's use Variables to store Strings. For
                        instance, you can have a Variable named "wizard_name"
                        and fill it with your magical name, like "Wizard
                        Sparkle" or "Enchanting Ella"! With Variables, you can
                        change your name anytime you want, just like a
                        shape-shifting spell!
                      </p>

                      <div className="iframe-wrap">
                        <iframe
                          src="https://trinket.io/embed/python/e975790366?runOption=run"
                          width="100%"
                          height="356"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <h2>Calculation</h2>
                      <p>
                        Now, let's combine the power of Variables with some
                        magical math! You can use Variables to perform
                        spellbinding calculations. For example, if you have two
                        Variables named "dragons" and "unicorns," you can add
                        them together to find out how many magical creatures you
                        have in total!
                      </p>

                      <div className="iframe-wrap">
                        <iframe
                          src="https://trinket.io/embed/python/e975790366?runOption=run"
                          width="100%"
                          height="356"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <h2>Updating your Variable</h2>
                      <p>
                        Sometimes in your coding journey, you might need to
                        update the value stored in a Variable. Think of it as
                        replenishing your magical energy. You can increase or
                        decrease the value of a Variable as you learn and
                        explore more. It's like leveling up your coding skills!
                      </p>

                      <div className="iframe-wrap">
                        <iframe
                          src="https://trinket.io/embed/python/2b21805896?runOption=run"
                          width="100%"
                          height="356"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <h2>Lists</h2>
                      <p>
                        Remember, young wizards, Variables are not only about
                        storing single treasures. You can also use them to store
                        lists of magical items! For instance, you can have a
                        Variable called "spells" and fill it with a list of
                        enchanting spells you've learned. With Variables, you
                        can organize your magical knowledge in a snap!
                      </p>

                      <div className="iframe-wrap">
                        <iframe
                          src="https://trinket.io/embed/python/1343f67bb4?runOption=run"
                          width="100%"
                          height="356"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <h2>Delete your Variable</h2>
                      <p>
                        Now, here's a magical spell to remember: if you ever
                        need to remove a Variable from your coding world, you
                        can do it with a simple forgetfulness charm, and the
                        Variable will disappear!
                      </p>

                      <div className="iframe-wrap">
                        <iframe
                          src="https://trinket.io/embed/python/2b61445b52?runOption=run"
                          width="100%"
                          height="356"
                          frameborder="0"
                          marginwidth="0"
                          marginheight="0"
                          allowfullscreen
                        ></iframe>
                      </div>

                      <p>
                        Congratulations, young apprentices! You've unlocked the
                        secrets of Variables in Python! Now, it's time for a
                        mystical quiz to test your newfound Variable magic!
                      </p>

                      <LottieAnimation animationData={animation2} />
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 3 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Conditionals</h1>
                    <div className="curriculumCardAnimation">
                      <LottieAnimation animationData={animation1} />
                    </div>
                    <div className="curriculumCardText">
                      <h3>Fun with Conditionals in Python</h3>
                      <br />

                      <p>
                        Welcome, young coders, to an exciting adventure into the
                        world of Python coding! Today, we'll learn about
                        "Conditionals" - the secret to making decisions in code!
                        Imagine being a super spy who needs to decode secret
                        messages to save the day. Well, that's exactly what
                        we're going to do!
                      </p>
                      <div className="curriculumCardAnimation">
                        <div id="lottieSpyAnimation">
                          <LottieAnimation />
                        </div>
                      </div>
                      <p>
                        What are Conditionals? <br></br>
                        Conditionals are like "if" questions for your computer.
                        They help your code decide what to do based on certain
                        conditions. Think of it as your code's superpower -
                        making it smarter and more interactive! Let's see how it
                        works with our secret code-breaking mission.
                      </p>

                      <h2>Detective task: Guess the Secret Number</h2>
                      <p>
                        We've intercepted a coded message from the evil
                        mastermind Dr. Enigma! Your mission is to help our
                        detective PythonBot guess the secret number. Here's how
                        it works:
                      </p>
                      <iframe
                        src="https://trinket.io/embed/python/800b73ea65?start=result"
                        width="100%"
                        height="356"
                        allowFullScreen
                      ></iframe>
                      <p>
                        Let's Understand the Code: In the code, we set a secret
                        number and ask the player (that's you!) to guess the
                        number. The "if" statement checks if your guess is equal
                        to the secret number. If it is, you cracked the code and
                        get a congratulatory message! If not, you'll get a clue
                        to try again. Keep guessing until you unlock the secret!
                      </p>
                      <p>
                        Let's Make Choices with "if" and "else" <br></br>
                        In our secret code-breaking mission, PythonBot used the
                        "if" and "else" statements to make choices. When your
                        guess is correct, the "if" block runs, and if your guess
                        is wrong, the "else" block runs. It's like magic, right?
                      </p>
                      <p>
                        Your Turn: Create Your Secret Code <br></br>
                        Now it's your turn to be the mastermind! Use
                        conditionals to create your secret code. You can make a
                        guessing game like we did or make your own fun adventure
                        with PythonBot!
                      </p>
                      <p>
                        What are Conditionals? <br></br>
                        Conditionals are like "if" questions for your computer.
                        They help your code decide what to do based on certain
                        conditions. Think of it as your code's superpower -
                        making it smarter and more interactive! Let's see how it
                        works with our secret code-breaking mission.
                      </p>

                      <p>
                        Detective Task: Guess the Secret Number <br></br>
                        We've intercepted a coded message from the evil
                        mastermind Dr. Enigma! Your mission is to help our
                        detective PythonBot guess the secret number. Here's how
                        it works:
                      </p>

                      <img
                        src="/src/assets/conditionalsCodeSnippet1.png"
                        className="codeSnippet"
                      ></img>

                      <p>
                        Let's Understand the Code: <br></br>
                        In the code, we set a secret number and ask the player
                        (that's you!) to guess the number. The "if" statement
                        checks if your guess is equal to the secret number. If
                        it is, you cracked the code and get a congratulatory
                        message! If not, you'll get a clue to try again. Keep
                        guessing until you unlock the secret! Unlock the
                        Treasure Challenge: <br></br>
                        Let's have some more fun! PythonBot has reached a
                        treasure chest, but it's locked with a secret code. Help
                        PythonBot crack the code using conditionals, and the
                        treasure will be all yours!
                      </p>
                      <p>
                        Let's Make Choices with "if" and "else" <br></br>
                        In our secret code-breaking mission, PythonBot used the
                        "if" and "else" statements to make choices. When your
                        guess is correct, the "if" block runs, and if your guess
                        is wrong, the "else" block runs. It's like magic, right?
                      </p>
                      <p>
                        Your Turn: Create Your Secret Code <br></br>
                        Now it's your turn to be the mastermind! Use
                        conditionals to create your secret code. You can make a
                        guessing game like we did or make your own fun adventure
                        with PythonBot!
                      </p>
                      <div className="curriculumCardAnimation">
                        <LottieAnimation animationData={animation2} />
                      </div>
                      <p>
                        Unlock the Treasure Challenge: <br></br>
                        Let's have some more fun! PythonBot has reached a
                        treasure chest, but it's locked with a secret code. Help
                        PythonBot crack the code using conditionals, and the
                        treasure will be all yours!
                      </p>
                      <iframe
                        src="https://trinket.io/embed/python/795f03c073"
                        width="100%"
                        height="356"
                        frameborder="0"
                        marginwidth="0"
                        marginheight="0"
                        allowfullscreen
                      ></iframe>
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 4 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Lists</h1>
                    <div className="curriculumCardAnimation">
                      <LottieAnimation animationData={animation3} />
                    </div>
                    <div className="curriculumCardText">
                      <h3>Fun with Lists in Python</h3>
                      <br />
                      <p>
                        What are Lists? <br></br>
                        Imagine you're going on an epic adventure, and you want
                        to keep a record of all the cool stuff you find. A list
                        is like your adventure journal, where you can write down
                        everything you've discovered. Similarly, in Python,
                        lists can store multiple items, such as numbers, words,
                        or even other lists!
                      </p>
                      <p>
                        Creating a List: <br></br>
                        Let's see how PythonBot creates a list of gems found
                        during the quest:
                      </p>
                      <p>
                        Accessing Items in the List: <br></br>
                        PythonBot wants to know what the first gem found was. In
                        Python, we use "indexing" to access items in a list. The
                        first item has an index of 0, the second has an index of
                        1, and so on.
                      </p>
                      <p>
                        Adding More Gems: <br></br>
                        On the quest, PythonBot discovers a new gem, the
                        "Topaz." Let's add it to the list:
                      </p>
                      <div className="curriculumCardAnimation">
                        <LottieAnimation animationData={animation4} />
                      </div>
                      <p>
                        Counting the Gems: <br></br>
                        PythonBot wants to know how many gems have been found.
                        Python can easily count the items in a list for us:
                      </p>
                      <p>
                        Your Turn: Customize Your Quest <br></br>
                        Create your own adventure! Make a list of items you'll
                        discover during your journey. You can have gems, magical
                        creatures, or even planets in your list. Let your
                        imagination run wild!
                      </p>
                      <p>
                        Magic with "for" Loop: <br></br>
                        PythonBot learns a powerful spell, the "for" loop, to go
                        through the list and find all the gems:
                      </p>
                      <p>
                        Sorting the Gems: <br></br>
                        PythonBot wants to arrange the gems alphabetically.
                        Python can sort the list for us:
                      </p>
                      <p>
                        Great job, young adventurers! You've conquered the world
                        of Python Lists and can now organize your data like a
                        pro! Remember, lists are incredible tools that make
                        coding even more exciting and adventurous!
                      </p>
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 5 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Loops</h1>
                    <div className="curriculumCardAnimation">
                      <LottieAnimation animationData={animation6} />
                    </div>
                    <div className="curriculumCardText">
                      <p>Round and Round we go!</p>
                      <p>
                        Hello, young coders! Today, we are going to learn about
                        an exciting concept called "Loops" in Python. Imagine
                        you have a magical wand that can do the same action over
                        and over again! That's what loops do in Python – they
                        repeat a set of instructions as many times as you want!{" "}
                        <br />
                        <br />
                        🌟 Magical Repeating Spells 🌟 <br />
                        Think of loops as magical spells that can create wonders
                        in your code. One popular type of loop is called a "for
                        loop." Imagine you have a basket full of colorful
                        candies. Let's use a for loop to pick one candy at a
                        time and see its color. We'll start from the first candy
                        and go until the last one in the basket.
                        <br /> <br />
                        Here's how the spell looks in Python:
                      </p>
                      <iframe
                        src="https://trinket.io/embed/python/132da6e74f"
                        width="100%"
                        height="356"
                        frameborder="0"
                        marginwidth="0"
                        marginheight="0"
                        allowfullscreen
                      ></iframe>
                      <br /> <br />
                      <br /> <br />
                      <p>
                        🌟Looping through a Rainbow! 🌟
                        <br />
                        Now, let's go on a magical journey through a rainbow
                        using another type of loop called the "while loop."
                        Imagine you're walking along the rainbow's colorful
                        arches, and you'll keep walking until you reach the end
                        of the rainbow! Here's the enchanting spell in Python:
                      </p>
                      <iframe
                        src="https://trinket.io/embed/python/44e8d5e69f"
                        width="100%"
                        height="356"
                        frameborder="0"
                        marginwidth="0"
                        marginheight="0"
                        allowfullscreen
                      ></iframe>
                      <p>
                        With this spell, you can dance along the colors of the
                        rainbow forever!
                        <br />
                        <br />
                        🌟 Challenge Yourself 🌟
                        <br />
                        Now, it's time for a magical challenge! Can you use a
                        loop to count from 1 to 10 and say "Abracadabra" after
                        each number? Give it a try and see the magic unfold in
                        your code!
                      </p>
                      {buttons}
                    </div>
                  </main>
                )}
                {id == 6 && (
                  <main>
                    <h2>Learn Python</h2>
                    <h1>Functions</h1>
                    <div className="curriculumCardAnimation">
                      <LottieAnimation animationData={animation7} />
                    </div>
                    <div className="curriculumCardText">
                      <p>What are Functions?</p>
                      <p>
                        Hey there! Today, we're going to embark on an exciting
                        adventure into the world of Python functions. Think of
                        functions as magic spells that make your code do
                        incredible things!
                        <br />
                        <br />
                        🌟 What is a Function? 🌟
                        <br />
                        Imagine you have a robot friend, and you want it to
                        perform specific tasks for you. You would teach your
                        robot how to do those tasks step by step, right? In
                        Python, a function is like your friendly robot! It's a
                        set of instructions that you give a name, so you can
                        call on it whenever you need to perform that task.
                        <br />
                        <br />
                        🌟How to Create a Function? 🌟
                        <br />
                        Creating a function is like making a new recipe for a
                        delicious cake! First, you give it a name (like
                        "bake_cake"), and then you list the instructions inside
                        it. Remember, the computer will follow your instructions
                        exactly as you write them! Once you've created your
                        function, it's time to put it to work! Just like a chef
                        follows a recipe, you can call your function to execute
                        the instructions inside it. To call the "say_hello"
                        function, simply use the function name followed by
                        parentheses.
                        <br />
                        <br />
                        Here's an example of a simple function to say "Hello!":
                      </p>
                      <iframe
                        src="https://trinket.io/embed/python/d2d41fac28"
                        width="100%"
                        height="356"
                        frameborder="0"
                        marginwidth="0"
                        marginheight="0"
                        allowfullscreen
                      ></iframe>
                      <br />
                      <br />
                      <br />
                      <p>
                        🌟Functions with Parameters🌟
                        <br />
                        Sometimes, you need to tell your robot friend more
                        details to get the job done. That's where parameters
                        come in handy! Parameters are like giving your function
                        extra instructions to work with.
                        <br />
                        <br />
                        Let's create a function that says hello to someone
                        specific and let's call the function and tell it who to
                        greet:
                      </p>
                      <iframe
                        src="https://trinket.io/embed/python/1cbf5b66e6"
                        width="100%"
                        height="356"
                        frameborder="0"
                        marginwidth="0"
                        marginheight="0"
                        allowfullscreen
                      ></iframe>
                      <p>
                        You're doing fantastic! You've just unleashed the power
                        of functions in Python. They make your code organized,
                        reusable, and super fun to work with. 🌟 Keep practicing
                        and exploring the magical world of Python functions. The
                        more you learn, the more you'll be able to create
                        exciting and creative programs!
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
