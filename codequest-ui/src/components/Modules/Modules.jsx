import React from 'react'
import './Modules.css'

export default function Modules() {
  return (
    <div className='Modules'>
      <div className='moduleCard'>
        <h1>Learn Python</h1>
        <div className="moduleCircles">
          <a href="/curriculum">
            <span className="selectedCircle">
              <h4>Data Types</h4>
            </span>
          </a>
          <span className="circle">
          <h4>Variables</h4>
          </span>
          <span className="circle">
          <h4>Conditionals</h4>
          </span>
          <span className="circle">
          <h4>Lists</h4>
          </span>
          <span className="circle">
          <h4>Loops</h4>
          </span>
          <span className="circle">
          <h4>Functions</h4>
          </span>
        </div>
      </div>

      <div className='moduleCard'>
        <h1>Learn React</h1>
        <div className="moduleCircles">
          <span className="circle">
            <h4>Data Types</h4>
          </span>
          <span className="circle">
          <h4>Variables</h4>
          </span>
          <span className="circle">
          <h4>Conditionals</h4>
          </span>
          <span className="circle">
          <h4>Lists</h4>
          </span>
          <span className="circle">
          <h4>Loops</h4>
          </span>
          <span className="circle">
          <h4>Functions</h4>
          </span>
        </div>
      </div>
    </div>
  )
}