import '../stylesheets/About.css';
import React from 'react'

const About = () => {
    return (
        <div className="info-header">
            <div className="info-title">About QuizOverflow</div>
            <div className="info-text">
                <p>
                  QuizOverflow is a website where users can play quizzes in multiple categories.
                </p>
                <p>
                  The website allows visitors to play categorized quizzes consisting of 5 questions in the selected category.
                  Visitors can also view the list of questions, but can only view answers and edit/delete the questions if they are logged in and have the right permissions, which is controlled through with Auth0 using JSON web tokens.
                </p>
                <p>
                  I used the following technologies to build the website :
                  <ul>
                    <li><b>React</b>, <b>Javascript</b>, <b>HTML</b> and <b>CSS</b> for the frontend</li>
                    <li><b>Python3</b> and <b>Flask</b> as the backend language and framework</li>
                    <li><b>Python unittest library</b> for test-driven development</li>
                    <li><b>PostgreSQL</b> for the database</li>
                    <li><b>SQLAlchemy ORM</b> as the ORM library</li>
                  </ul>
                  <p>
                    Both the frontend and the backend API are hosted on Heroku, and their source code is available on <a href="https://github.com/gyadam/quizoverflow">GitHub</a>.
                  </p>
                </p>   
            </div>
        </div>
    );
}

export default About;