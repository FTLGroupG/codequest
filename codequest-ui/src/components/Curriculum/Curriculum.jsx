import React from "react";
import "./Curriculum.css";

import { Link, useParams, Outlet } from "react-router-dom";
import { useState, useContext } from "react";
import Quiz from "../Quiz/Quiz";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthContext from "../../contexts/auth";
import AccessForbidden from "../AccessForbidden/AccessForbidden";

export default function Curriculum() {
  const { id } = useParams();

  const { userContext } = useContext(AuthContext);
  const [user, setUser] = userContext;

  const buttons = (
    <div className="curriculumCardButtonCard">
      <button className="curriculumCardButton">Back</button>
      <Link to={`/modules/${id}/curriculum/finished`}>
        <button className="curriculumCardButton">Next</button>
      </Link>
    </div>
  );

  return (
    <div className="Curriculum">
      <div className="curriculumCard">
        {console.log(id)}
        {id == 1 ? (
          <>
            {console.log("hi")}
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
              <p>
                Data Types is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen btook.
              </p>
              <ul>
                <li>Integers</li>
                <li>Strings</li>
                <li>Floats</li>
                <li>Booleans</li>
              </ul>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book.
              </p>
              {buttons}
            </div>
          </>
        ) : (
          <>
            {user.email ? (
              <>
                {id == 2 && (
                  <>
                    <div>Curriculum 2</div>
                    {buttons}
                  </>
                )}
                {id == 3 && (
                  <>
                    <div>Curriculum 3</div>
                    {buttons}
                  </>
                )}
                {id == 4 && (
                  <>
                    <div>Curriculum 4</div>
                    {buttons}
                  </>
                )}
                {id == 5 && (
                  <>
                    <div>Curriculum 5</div>
                    {buttons}
                  </>
                )}
                {id == 6 && (
                  <>
                    <div>Curriculum 6</div>
                    {buttons}
                  </>
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
