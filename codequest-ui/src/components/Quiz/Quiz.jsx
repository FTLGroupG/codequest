import React from 'react'
import './Quiz.css'

export default function Quiz() {
  return (
    <div className='Quiz'>
      <div className='quizCard'>
      <div className='quizContent'>
        <h2>Question 1/10</h2>
        <div className='question'>
          <h2>A data type that represents a whole number is a(n)</h2>
          <div className='answerRectangle'></div>
        </div>
        <div className='horizontalAnswers'>
            <button>Float</button>
            <button>String</button>
            <button>Integer</button>
            <button>Boolean</button>
        </div>
      </div>
      </div>

      <div className='quizCard'>
        <div className='quizContent'>
          <h2>Question 1/10</h2>
          <div className='question'>
            <h2>What is a boolean?</h2>
          </div>

          <div className='verticalAnswers'>
            <button><h5>a data type that is used to represent text rather than numbers</h5></button>
            <button>a result that can only have one of two possible values: true or false</button>
            <button>a data type used to represent numbers that don’t have fractional values</button>
            <button>a data type used to represent numbers with decimals</button>
          </div>
        </div>
      </div>

      <div className='quizCard'>
      <div className='quizContent'>
        <h2>Question 12/12</h2>
        <div className='question'>
          <h2>Which code block correctly uses an integer?</h2>
        </div>
        <div className='horizontalAnswers'>
            <div className='questionRectangle'>
              <pre>
                <code>

my_integer = 42


print(my_integer)


result = my_integer + 10
print(result)


if my_integer  50:
    print("The integer is greater than 50")
else:
    print("The integer is not greater than 50")

                </code>
              </pre>
            </div>
        </div>
      </div>
      </div>

    </div>
  )
}