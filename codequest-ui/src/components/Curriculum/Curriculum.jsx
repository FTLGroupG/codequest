import React from 'react'
import './Curriculum.css'

export default function Curriculum() {
  return (
    <div className='Curriculum'>
        <div className='curriculumCard'>
            <h1>Learn Python</h1>
            <h2>Data Types</h2>
            <div className="curriculumCardText">
                <h3>What is a data type?</h3>
                <p>Data Types is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen btook.</p>
                <ul>
                    <li>Integers</li>
                    <li>Strings</li>
                    <li>Floats</li>
                    <li>Booleans</li>
                </ul>
                <div className="curriculumCardCode">
                <pre>
                    <code>
                    coffee_price = 1.50
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
print(number_of_coffees)
                    </code>
                </pre>
                </div>
                
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
            </div>
        </div>
    </div>
  )
}