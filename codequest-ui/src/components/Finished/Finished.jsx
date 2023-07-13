import React from 'react'
import './Finished.css'

export default function finished() {
  return (
    <div className='Finished'>
      <div className='finishedContent'>
        <h1>🎉 Congratulations! 🎉</h1>
        <h2>You have finished this lesson!</h2>
        <a href='/quiz'>
        <button>Start Quiz</button>
        </a>
      </div>
    </div>
  )
}