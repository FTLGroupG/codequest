import React from 'react'
import './Home.css'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='Home'>
        <div className="Hero">
          <h1>Learn how to code in a fun and interactive way!</h1>
          <img src="https://www.usnews.com/object/image/00000171-9ce7-d084-affd-9def28d10000/200421-boylaptop-stock.jpg?update-time=1587475425427&size=responsive640" alt="Child sitting at a desk working on a laptop"></img>
        </div>
        <Link to="/register"><button>Sign Up</button></Link>

        <div className='Card'>
          <h2>Want to try a lesson before signing up?</h2>
          <div className="pythonCard">
            <h3>Learn Python</h3>
            <h5>In this lesson, we will learn the basics about the Python coding language!</h5>
            <img src="https://idsb.tmgrup.com.tr/ly/uploads/images/2022/08/22/226382.jpg" alt="Python logo"></img>
        </div>
          <Link to="/modules"><button>Try Sample Lesson</button></Link>
        </div>

      <div className='playGamesCard'>
        <div className='cardTextFloatRight'>
          <h4>Designed for kids aged 6-10</h4>
          <h2>Play games and learn how to code at the same time!</h2>
          <h4>CodeQuest is designed to give kids a fun and interactive environment to learning. Give it a try!</h4>
        </div>
        <Link to="/register"><button>Sign Up</button></Link>
        <button><Link to="/modules">Try Sample Lesson</Link></button>
      </div>
    </div>
  )
}