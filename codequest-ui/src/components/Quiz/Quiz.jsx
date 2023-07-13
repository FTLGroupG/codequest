import React from 'react'
import './Quiz.css'

export default function Quiz() {
  return (
    <div className='Quiz'>
      <div className='quizContent'>
        <h2>Question 1/10</h2>
        <div className='question'>
          <h2>A data type that represents a whole number is a(n)</h2>
          <div className='answerRectangle'></div>
        </div>
        <div className='answers'>
            <button>Float</button>
            <button>String</button>
            <button>Integer</button>
            <button>Boolean</button>
        </div>
      </div>
    </div>
  )
}