import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="Home">
      <div className="Hero">
        <h1 className="fadeIn">
          Learn how to code in a fun and interactive way!
        </h1>
        <img
          src="https://www.usnews.com/object/image/00000171-9ce7-d084-affd-9def28d10000/200421-boylaptop-stock.jpg?update-time=1587475425427&size=responsive640"
          alt="Child sitting at a desk working on a laptop"
        ></img>
      </div>
      <div className="robot-signup">
        <img
          src="src/assets/robot.png"
          id="floating-robot"
          width="200px"
          className="floating"
        ></img>
        <Link to="/register">
          <button className="signUpHomeButton">Sign Up</button>
        </Link>
      </div>

      {/* <div className='playGamesCard'>

          <div className='cardTextFloatRight'>
          <h4>Designed for kids aged 6-10</h4>
          <h2 className="pinkH2">Play games and learn how to code at the same time!</h2>
          <h4>CodeQuest is designed to give kids a fun and interactive environment to learning. Give it a try!</h4>
        </div>
        <button><Link to="/modules">Try Sample Lesson</Link></button>
        <button><Link to="/register">Sign Up</Link></button>
        </div> */}

      <div className="testSection">
        <div className="custom-shape-divider-top-1690233543">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
        <div className="fadeIn">
          <div className="cardTextFloatRight">
            <h3>Designed for kids aged 6-10</h3>
            <h2 className="pinkH2">
              Play games and learn how to code at the same time!
            </h2>
            <h3>
              CodeQuest is designed to give kids a fun and interactive
              environment to learning. Give it a try!
            </h3>
          </div>
        </div>
        <div className="testSectionButtons">
          <button>
            <Link to="/modules">Try Sample Lesson</Link>
          </button>
          <button>
            <Link to="/register">Sign Up</Link>
          </button>
        </div>
      </div>

      <div className="testCard">
        <div className="custom-shape-divider-top-1690235926">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>

        <div className="floating">
          <h2>Want to try a lesson before signing up?</h2>
          <div className="pythonCard">
            <h3>Learn Python</h3>
            <h4>
              In this lesson, we will learn the basics about the Python coding
              language!
            </h4>
            <img
              src="https://idsb.tmgrup.com.tr/ly/uploads/images/2022/08/22/226382.jpg"
              alt="Python logo"
            ></img>
          </div>
          <Link to="/modules">
            <button>Try Sample Lesson</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
